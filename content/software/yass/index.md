+++
title = "YetAnotherSimulationSuite.jl"
description = "A simulation suite for atomistic simulations in Julia"
date = 2026-01-28

[taxonomies]
tags = ["Julia", "Science"]
+++

<img src="https://github.com/Cavenfish/YetAnotherSimulationSuite.jl/blob/main/docs/src/assets/logo.png" alt="Logo" width=350 >

YASS is a modern, flexible atomic simulation suite written in Julia. It aims to provide:

- 🎯 Simple, and intuitive API
- ⚡ High performance native Julia implementation
- 🔧 Easy extensibility for custom methods
- 📦 Built-in potentials and analysis tools

## Features

- 🧪 Multiple molecular dynamics ensembles (NVE, NVT)
- 🔬 Built-in analysis tools (RDF, VACF)
- ⚛️ Geometry and cell optimizations
- 📊 Common water models (TIP4P/2005f, SPC-F) 
- 💻 Easy-to-extend architecture
- 🚄 High performance through Julia's native speed
- 📝 Comprehensive documentation

## Installation

```
pkg> add YetAnotherSimulationSuite
```

## Performance

Julia often delivers substantial performance gains over Python for numerical and scientific code because it is JIT‑compiled, type‑stable, and generates native LLVM code, so well‑written Julia can approach C/Fortran speeds. However, that speed comes with trade‑offs: just‑in‑time compilation (and package precompilation) introduces startup latency, and Julia’s compilation artifacts and runtime can consume more memory than lightweight Python interpreters. In practice, Julia is most advantageous for long‑running, compute‑intensive workflows; for short scripts or very memory‑constrained environments you should weigh the startup and memory overheads or use precompilation strategies to mitigate them.

A benchmark comparing YASS to other similar packages can be found in the [documentation](https://cavenfish.github.io/YetAnotherSimulationSuite.jl/stable/benchmark/).
