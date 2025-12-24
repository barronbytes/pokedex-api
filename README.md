# Pokédex API

This project uses a CLI frontend with a REPL loop to fetch data from the PokéAPI. TypeScript structures maintain session state and cache API responses.

**Project Demo:**

<img src="./public/pokedex-demo.gif" alt="Demonstration of using program to make calls to the PokéAPI." width="100%">

## Tech Stack

- **Frontend:** TypeScript (CLI / REPL-based)
- **Backend:** n/a (consumes the public PokéAPI)
- **Runtime:** Node.js v22.15.0+
- **Tooling:** npm, TypeScript, Vitest

## Project Structure

``` bash
pokedex-cli/
├── public/                     # Media assets
├── src/
│   ├── main.ts                 # Application entry point
│   ├── state.ts                # Centralized session state shared across commands
│   ├── repl.ts                 # REPL loop handling user input and output
│   ├── command-records.ts      # CLI command definitions and command registry
│   ├── command-functions.ts    # Business logic executed by CLI commands
│   ├── pokeapi.ts              # HTTP client for interacting with the PokéAPI
│   ├── pokeapi.types.ts        # TypeScript types and schemas for PokéAPI responses
│   └── cache.ts                # In-memory cache to prevent redundant API calls
├── .gitignore                  # Git ignore rules
├── .env                        # Environment variable configuration
├── .nvmrc                      # Node.js version specification
├── package.json                # Project metadata and dependencies
├── package-lock.json           # Dependency lockfile
├── tsconfig.json               # TypeScript compiler configuration
├── repl.log                    # Logged REPL session output
└── README.md                   # Project documentation

# Before running this project locally, ensure you have the following installed:
- IDE (VS Code, PyCharm, etc.)
- Install Python 3.10+ version > visit python.org/downloads/
- Node.js v22.15.0 or higher (version specified in .nvmrc)

# Dev Dependencies
- TypeScript: static typing and compilation
- @types/node: Node.js type definitions for TypeScript
- Vitest: unit testing framework

# Dependencies
- dotenv: loads environment variables from a .env file
- zod: runtime schema validation and type-safe data parsing
```

## Quick Start

This repo will later be, if not already, saved as a subfolder. Be sure to only clone relevant files. Then, do the following:

...

## Usage

...

## System Design

...

## Credits and Contributing

[Boot.dev](https://www.boot.dev) provided the project requirements and guidance to complete this project. Contributions are welcome! Feel free to report any problems.