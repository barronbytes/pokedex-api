import { State } from "./state.js";
import { Locations } from "./pokeapi.types.js";


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


// Shared helper to fetch PokeAPI locations
async function fetchLocationsAndUpdateCache(state: State, url: string): Promise<Locations | void> {
    const result = await state.apiLocations(url);

    // Exit method if fetchPokeAPI fails
    if (!result.success) {
        console.error(result.error.message);
        return;
    }

    // Update cache with url and locations
    const locations = result.data;
    state.pokeApiCache.addResponse(url, locations);

    // Return locations
    return locations
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
    // Set url and locations with cache check
    const url = state.nextLocationsURL ?? "https://pokeapi.co/api/v2/location-area?limit=20";
    const cacheEntry = state.pokeApiCache.getResponse(url);
    const locations = cacheEntry ? cacheEntry.response : await fetchLocationsAndUpdateCache(state, url);

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

    // Set url and locations with cache check
    const url = state.prevLocationsURL ?? "https://pokeapi.co/api/v2/location-area?limit=20";
    const cacheEntry = state.pokeApiCache.getResponse(url);
    const locations = cacheEntry ? cacheEntry.response : await fetchLocationsAndUpdateCache(state, url);

    if (locations) {
        displayLocations(state, locations);
    }
}
