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


// Shared helper to fetch API data and update cache
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

    // Return locations
    return cacheResult
}


// Shared helper to print PokeAPI locations
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


// Logic to determine when to add Pokemon to Pokedex
export async function commandCatch(
    state: State, 
    ...args: string[]
): Promise<void> {
    if (!args.length) {
        console.log("Please provide the name of a Pokémon to catch.");
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

    // Set pokemon and catch logic (weaker pokemon => higher catchChance => wider roll vs catchChance range)
    const pokemon: Pokemon = result.data;
    const catchChance = Math.max(0.1, 1 - pokemon.base_experience / 300);
    const roll = Math.random();

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    if (roll <= catchChance) {
        state.pokedex[pokemon.name] = pokemon;
        console.log(`${pokemon.name} was caught!`);
    } else {
        console.log(`${pokemon.name} escaped!`);
    }
}


// Logic to determine when to add Pokemon to Pokedex
export async function commandInspect(
    state: State, 
    ...args: string[]
): Promise<void> {
    if (!args.length) {
        console.log("Please provide the name of a Pokémon to catch.");
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

    // Set pokemon and catch logic (weaker pokemon => higher catchChance => wider roll vs catchChance range)
    const pokemon: Pokemon = result.data;
    const catchChance = Math.max(0.1, 1 - pokemon.base_experience / 300);
    const roll = Math.random();

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    if (roll <= catchChance) {
        state.pokedex[pokemon.name] = pokemon;
        console.log(`${pokemon.name} was caught!`);
    } else {
        console.log(`${pokemon.name} escaped!`);
    }
}
