import { State } from "./state.js";
import * as PokeAPI from "./pokeapi.js";
import { Locations, Pokemon } from "./pokeapi.types.js";


// Close the readline interface to stop the REPL loop before exiting the application
export async function commandExit(state: State): Promise<void> {
    console.log("Closing the Pokedex... Goodbye!");
    state.repl.close();
    process.exit();
}


// Display usage information for all CLI commands
export async function commandHelp(state: State): Promise<void> {
    console.log("Welcome to the Pokedex!");
    console.log("Usage: \n\n");
    for (const command of Object.values(state.commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
}


// Helper function to fetch location API data and update cache
async function fetchAndCache<T>(
    state: State, 
    apiCallFunction: (url: string | null) => Promise<PokeAPI.ApiCallResult<T>>,
    cacheKey: string,
): Promise<T | void> {
    const result = await apiCallFunction(cacheKey);

    // Exit method if fetchPokeAPI fails
    if (!result.success) {
        console.error(result.error.message);
        return;
    }

    // Update cache with url and locations
    const cacheResult = result.data;
    state.pokeApiCache.addResponse(cacheKey, cacheResult);

    // Return cache result
    return state.pokeApiCache.getResponse(cacheKey)?.response as T;
}


// Helper function to fetch pokemon API data
export async function fetchPokemon(
    state: State, 
    ...args: string[]
): Promise<Pokemon | void> {
    if (!args.length) {
        console.log("Please provide the name of a Pokémon for this command.");
        return;
    }

    // Fetch Pokémon information
    const pokemonName = args[0].toLowerCase();
    const url = `${PokeAPI.getPokemonURL()}/${pokemonName}`;
    const result = await PokeAPI.fetchPokemon(url);

    if (!result.success) {
        console.log(`Error: Failed to find Pokémon '${pokemonName}': ${result.error.message}`);
        return;
    }

    // Return individual Pokemon
    const pokemon: Pokemon = result.data;
    return pokemon
}


// Helper function to print PokeAPI locations
function displayLocations(state: State, locations: Locations): void {
    for (const loc of locations.results) { 
        console.log(loc.name); 
    } 
    
    // Update pagination URLs 
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
}


// Return next page of PokeAPI location area results
export async function commandNextPage(state: State): Promise<void> {
    // Set url and response data with cache check
    const url = state.nextLocationsURL ?? `${PokeAPI.getLocationURL()}?limit=20`;
    const cacheEntry = state.pokeApiCache.getResponse(url);
    const locations = cacheEntry 
        ? cacheEntry.response 
        : await fetchAndCache(state, PokeAPI.fetchLocations, url);

    if (locations) {
        displayLocations(state, locations);
    }
}


// Return previous page of PokeAPI location area results
export async function commandPreviousPage(state: State): Promise<void> {
    // Exit early if there is no previous page
    if (!state.prevLocationsURL) {
        console.log("You're on the first page. Use the `map` command instead.");
        return;
    }

    // Fetch location area information + cache check/update
    const url = state.prevLocationsURL ?? `${PokeAPI.getLocationURL()}?limit=20`;
    const cacheEntry = state.pokeApiCache.getResponse(url);
    const locations = cacheEntry 
        ? cacheEntry.response 
        : await fetchAndCache(state, PokeAPI.fetchLocations, url);

    if (locations) {
        displayLocations(state, locations);
    }
}


// Return INDIVIDUAL PokeAPI location area
export async function commandExplore(
    state: State,
    location?: string
): Promise<void> {
    if (!location) {
        console.log("Error: Must provide location.");
        console.log("Usage: explore <valid-location-area>");
        return;
    }

    // Fetch INDIVIDUAL location area information + cache check/update
    const url = `${PokeAPI.getLocationURL()}/${location}`;
    const cacheEntry = state.pokeApiCache.getResponse(url);
    const locationArea = cacheEntry 
        ? cacheEntry.response 
        : await fetchAndCache(state, PokeAPI.fetchLocationArea, url);

    if (!locationArea) {
        console.log("Error: Location provided is invalid.");
        console.log("Usage: explore <valid-location-area>");
        return;
    }

    console.log(`Exploring ${location}...`);
    console.log("Found Pokemon:");
    for (const encounter of locationArea.pokemon_encounters) {
        console.log(` - ${encounter.pokemon.name}`);
    }
}


// Logic to determine when Pokemon are caught to enter Pokedex
export async function commandCatch(
    state: State, 
    ...args: string[]
): Promise<void> {
    // Determine if pokemon exists
    const pokemon = await fetchPokemon(state, ...args);
    if (!pokemon) return;

    // Set catch logic (weaker pokemon => higher catchChance => wider roll vs catchChance range)
    const catchChance = Math.max(0.1, 1 - pokemon.base_experience / 300);
    const roll = Math.random();

    console.log(`Throwing a Pokeball at ${pokemon.name}...`);

    if (roll <= catchChance) {
        state.pokedex[pokemon.name] = pokemon;
        console.log(`${pokemon.name} was caught!`);
    } else {
        console.log(`${pokemon.name} escaped!`);
    }
}


// Display individual Pokémon information from Pokédex
export async function commandInspect(
    state: State, 
    ...args: string[]
): Promise<void> {
    // Determine if pokemon exists
    const pokemon = await fetchPokemon(state, ...args);
    if (!pokemon) return;

    if (!state.pokedex[pokemon.name]) {
        console.log("you have not caught that pokemon");
        return;
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);

    console.log("Stats:");
    for (const stat of pokemon.stats) {
        console.log(`  - ${stat.stat.name}: ${stat.base_stat}`);
    }

    console.log("Types:");
    for (const type of pokemon.types) {
        console.log(`  - ${type.type.name}`);
    }
}


// Display all Pokémon found within Pokédex
export async function commandPokedex(
    state: State
): Promise<void> {
    const pokemon = Object.values(state.pokedex);
    if (!pokemon.length) {
        console.log("Pokedex is empty.");
        return;
    }

    // Logic to print Pokedex
    console.log("Your Pokedex:");
    for (const poke of pokemon) {
        console.log(`  - ${poke.name}`);
    }
}
