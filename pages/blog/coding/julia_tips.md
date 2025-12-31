+++
cover = false
+++

# Tips and Tricks for Julia programming

At this point there is a wealth of information for the Julia programming
language. Perhaps one of the best sources (outside of the official documentation
or discourse forum) is [JuliaNotes.jl](https://m3g.github.io/JuliaNotes.jl/stable/).
Personally, I find that more available information is better and since I'm a
big fan of Julia, I've decided to make my own contribution.

Here I'll outline some basic, but at times lesser-known, tips and tricks for
writing Julia code.

## Ternary Conditional Operator

Julia has the ternary operator for `if-else` statements. The best way to explain
it is to show two equivalent blocks of code. First, one that uses `if-else`

```julia
for i = 1:10
  if i > 5
    println("big")
  else
    println("small")
  end
end 
```

This lengthy `if-else` statement can be replaced with a ternary operator while
still preserving the logic in the code.

```julia
for i = 1:10
  i > 5 ? println("big") : println("small")
end
```

Within this ternary expression, the `?` operator denotes which boolean expression
(what comes before it) is being evaluated. The `:` operator separates the `if`
(before the `:`) and `else` (after the `:`) outcomes. This can help shrink
lengthy code blocks, but it comes with the additional cost of increased code
complexity. However, once familiar with the ternary operator, the complexity
of the expression goes away. 

## Short Circuit Expressions

In Julia the short circuit operators are `&&` (`and` operator), and `||`
(`or` operator). The most basic use for them is conditional statements.

```julia
x = 5

if (x > 3) && (x < 6)
  println("True")
end
```

In strictly-typed languages, these expressions can only evaluate to a boolean,
as is the case in the example above. However, Julia is a loosely-typed language,
which affords it the ability to return the last value in this expression. This
becomes a powerful tool for simplifying conditional statements, although some
argue that it unnecessarily increases the complexity of the code. Below I show
how you can convert the `if` statement above into a one-line short circuit expression.

```julia
x = 5

(x > 3) && (x < 6) && println("True")
```

This expression is equivalent to the `if` statement; as such, it only prints
`True` if both conditionals are satisfied (in this case they are). Since both
code blocks shown are equivalent, the choice for which to use comes down to
personal preference (or the repo style guide). I personally find it convenient
to use these statements for `continue` conditionals within loops.

```julia
for i = 1:10
  i == 5 && continue
  println(i)
end
```
## Pipes

If you are familiar with Bash scripting in Linux, then you will already be
familiar with pipes. In Julia, the pipe operator is `|>`. They can be used to
redirect the output of something into another function. For example, if you
have functions `foo` and `bar` such that you can run `bar(foo(x))`, then you
can also rewrite this as `foo(x) |> bar`. A handy use case for pipes is to
avoid defining multiple temporary variables, while also avoiding hard-to-read
nested calls.

```julia
foo(x) = 2 * sin(x)
bar(x) = 3 * x^2

# Several tmp vars
tmp1 = rand()
tmp2 = foo(tmp1)
x    = bar(tmp2)

# Multiple nested calls
x = bar(foo(rand()))

# One clean easy to read line
x = rand() |> foo |> bar
```

## Anonymous Functions

An anonymous function is (as the name suggests) a function without a name.
In Julia, these are done by using the `->` operator. A simple `f(x) = 2 * x^2`
function can be anonymized as `x -> 2 * x^2`; however, this example does not
properly showcase the value of these anonymous functions. Although they can be
used in numerous ways, they are most often used in two ways.

1) Alongside pipes

Sometimes you want to pipe output into a function that takes multiple arguments.
In those cases, you need to couple a pipe and an anonymous function. The example
below shows a simple version of this use case.

```julia
foo(x)   = 6 * x^2
bar(x,y) = x^2 - y^2

z = rand() |> foo |> (x -> bar(x, 6))
```

In this example the output of `foo` is piped into an anonymous function
(`x -> bar(x, 6)`) which passes the output into `bar` alongside an additional
argument.

2) Within function calls

Many built-in functions take an expression/function as an argument, for instance,
`filter` and `find` take expressions that evaluate to booleans as arguments.

```julia
x = rand(50)

filter(e -> e > 0.5, x)
```

The code block above uses the anonymous function `e -> e > 0.5` as the
expression argument for `filter`, which in this case filters out the values
larger than 0.5 from the array `x`. 

## Base Functions with Custom Types

This feature involves Julia's multiple dispatch, which is simply when multiple
functions have the same name but different arguments. This allows you to
write custom base functions for custom types. This is easier to understand
through an example. 

```Julia
struct Point{F <: Float64}
  x::F
  y::F
  z::F
end

function Base.show(io::IO, point::Point)
  println(io, "(x,y,z) = ($(point.x),$(point.y),$(point.z))")
end
```

The example above shows how to make a custom `show` function for a custom
type `Point`. This is called "extending" the `show` function. This makes it
so that when you display variables of the type `Point`, they will be displayed
using the custom `show` function above. This means that when instantiating a
variable `p = Point(1.0, 2.0, 3.0)` in the `repl`, the following output will
be `(x,y,z) = (1.0,2.0,3.0)`.

This can be done to all functions you have access to within your Julia code, 
even those from other imported packages. An important consideration here is
to make sure you avoid "type piracy", where you extend a function on types
that you did not define. For example,

```julia
Base.show(io::IO, f::Float64) = println(io, "This is type piracy")
```

extending `show` on the `Float64` type (which would not be extending but
rather "redefining", since it already exists) is a case of type piracy. 
This is considered bad practice since it can cause unexpected behavior within
your code, or someone else's code if they import your code.