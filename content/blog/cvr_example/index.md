+++
title = "CVR Example"
description = "An example of how to make the CVR thermostat in Julia"
date = 2025-12-30

[taxonomies]
tags = ["Julia",  "Science"]
+++

# Canonical Velocity Rescaling Thermostat

This thermostat is the most widely used thermostat for molecular dynamics (MD)
simulations. The [manuscript](https://pubs.aip.org/aip/jcp/article-abstract/126/1/014101/186581/Canonical-sampling-through-velocity-rescaling?redirectedFrom=fulltext) it was 
published in is one of the highest cited papers related to MD simulations.
Due to the massive success of this thermostat there is a wide array of resources
explaining the thermostat and the math behind it in simple terms. However, none
of these resources show how to implement the thermostat in a programming language.
Making the source code of MD packages the only option, but they are often very
difficult to follow. Since I've implemented this thermostat in Julia for my
MD package ([YASS](https://github.com/Cavenfish/YetAnotherSimulationSuite.jl)),
I wanted to put out a short explanation of implementing it. 

## Brief Math Explanation

The temperature of a system is related to the total kineteic energy of a system
by,

$
K = \frac{1}{2} k_B N_f T
$

where $K$ is the kinetic energy, $k_B$ is Boltzmann constant, $N_f$ is the 
degrees of freedom, and $T$ is the temperature. A velocity rescaling thermostat
takes advantage of this experssion by scaling the velocities to increase or
decrease the temperature of the system. Typically through a scaling factor 
($\alpha$),

$
\alpha = \sqrt{\frac{K_\text{target}}{K\text{current}}}
$

where $K_\text{target}$ is the target kinetic energy, and $K\text{current}$ is
the kinetic energy of the current timeframe of the simulation. The CVR thermostat
enforces a canonical sampling for $K_\text{target}$ to ensure proper
thermodynamic proporties in the simulation. The explicit derivation of this
can be found in the original manuscript, or even other online resources. For
the sake of just learning to implement the thermostat only these two concepts
are necessary.

## Coding it Up

We first need a function that calculates the temperature of our system from
the kinetic energy. We can calculate this by taking $\sum_i m_i v_i^2 = k_B N_f T$,
where the $\frac{1}{2}$ is dropped from both sides.

```julia
function getTemp(v::AbstractVector, m::AbstractVector, kB::Float64)
  # Leave out the 1/2 to get 2Ekin for T calc
  N    = length(m)
  Nf   = 3N - 3
  v2   = [i'i for i in v]
  Ekin = sum(m .* v2)
  
  Ekin / (kB * Nf)
end
```

The next thing we need is a function for sampling from a normal and gamma
distributions. You could implement this from scratch but its better to use the
implementations in [Distributions.jl](https://juliastats.org/Distributions.jl/stable/)
since they are well tested and highly performant. These two functions are
`Normal` and `Gamma` in the code blocks below.

The CVR thermostat needs to have non-zero velocities to scale (or else you still
have zero after scaling), so if your system has all zero velocities (or $T=0$)
then you skip apply the thermostat and let the system gain some amount of kinetic
energy due to the potential. This means adding a conditional return in your CVR
function to avoid wasteful computations. In this example I use a short circuit
expression (which I love but some hate), so I'll quickly explain them. These
expressions take advantage of the and/or logic by using the `&&` and `||`
operators to write compact if-then statements. 

```julia
# This shows a typical if statment within a for loop
for i = 1:100
  if i % 10 == 0
    println(i)
  end
end

# This does the same thing but using a short circuit expression
for i = 1:100
  i % 10 == 0 && println(i)
end

# Again, the same thing but using ||
for i = 1:100
  i % 10 != 0 || println(i)
end
```

Getting back to the CVR thermostat, once we have a non-zero kinetic energy
we can rescale the velocities to try to reach our desired temperature.

```julia
function CVR!(
    v::AbstractVector, m::AbstractVector, 
    kB::Float64, tau::Float64, Ttar::Float64
)
  N    = length(m)
  Tsim = getTemp(v, m, kB)

  Tsim == 0.0 && return

  Nf = 3N - 3
  n  = Normal(0.0,1.0)
  R1 = rand(n)

  R2 = if (Nf-1)%2 == 0
    alpha = (Nf - 1)/2
    G     = Gamma(alpha, 1)
    
    2 .* rand(G)
  else
    alpha = (Nf - 2)/2
    G     = Gamma(alpha, 1)
    
    2 .* rand(G) .+ (rand(n) .^2)
  end

  tau > 0.1 ? c1 = exp(-1/tau) : c1 = 0.0

  K     = 0.5 * Nf * kB * Tsim
  sigma = 0.5 * Nf * kB * Ttar

  Knew   = @. ( 
                K + (1-c1) * (sigma * (R2 + R1^2) / Nf - K) + 
                2 * R1 * sqrt(K * sigma / Nf * (1-c1) * c1)
              )
  alpha2 = @. sqrt(Knew / K)

  @. v *= alpha2
end
```