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
- Install Python 3.10+ version: visit python.org/downloads/
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

### Project & Dependencies Setup

1. Clone repository
2. Install [NVM](https://github.com/nvm-sh/nvm)
3. Activate v22.15.0 from `.nvmrc` file >> `nvm use`
4. Initialize Node.js project >> `npm init -y`
5. Install dev dependencies >> `npm install -D @types/node typescript vitest`
6. Install dependencies >> `npm install dotenv zod`
7. Configure `tsconfig.json` >> provided comments in file for guidance
8. Configure `package.json` >> `"type"` property arleady set and included four `"scripts": {}`

Step #3 creates the `package.json` file. Steps #5-6 add `node_modules/` and `package-lock.json`, and update `package.json` with the installed dependencies.

### Environmental Variables Setup

The app uses environmental variables. `APP_PROMPT` sets the REPL prompt; `CACHE_INTERVAL_MS` controls how frequently data is cached; and `BASE_LOCATION_URL` and `BASE_POKEMON_URL` define the PokéAPI endpoints for fetching locations and Pokémon data. These are publicly visible. Hiding them in the `.gitignore` file is unnecessary since no API keys are used in this project.

### .gitignore File Setup

You can configure this file as follows:

```bash
node_modules/
dist/
repl.log
```

## Usage

### Run the Program

Start the program:

> `npm run dev`

### Program Commands

- `help` >> Displays a help message
- `exit` >> Exits the Pokedex
- `map` >> Displays the next 20 location area names
- `mapb` >> Displays the previous 20 location area names
- `explore LOCATION-AREA-NAME` >> List Pokémon names found within a location area
- `catch POKEMON-NAME` >> Attempt to catch a Pokémon and add it to your Pokédex
- `inspect POKEMON-NAME` >> Display individual Pokémon information from Pokédex
- `pokedex` >> Display all caught Pokémon as part of Pokédex

## System Design

...

## Credits and Contributing

[Boot.dev](https://www.boot.dev) provided the project requirements and guidance to complete this project. Contributions are welcome! Feel free to report any problems.