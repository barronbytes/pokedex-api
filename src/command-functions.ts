import { CLICommand, State } from "./state.js";


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


// Return next page of PokeAPI location area results
export async function commandNextPage(state: State): Promise<void> {
    // Set url and fetch PokeAPI data
    const url = state.nextLocationsURL ?? "https://pokeapi.co/api/v2/location-area?limit=20";
    const result = await state.fetchPokeAPI(url);

    // Exit method if fetchPokeAPI fails
    if (!result.success) {
        console.error(result.error.message);
        return;
    }

    // Set and print locations
    const locations = result.data;
    for (const loc of locations.results) {
        console.log(loc.name);
    }

    // Update pagination URLs
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
}


// Return previous page of PokeAPI location area results
export async function commandPreviousPage(state: State): Promise<void> {
    // Exit early if there is no previous page
    if (!state.prevLocationsURL) {
        console.log("You're on the first page. Use the `map` command instead.");
        return;
    }

    // Set url and fetch PokeAPI data
    const url = state.prevLocationsURL;
    const result = await state.fetchPokeAPI(url);

    // Exit method if pokeapi fails
    if (!result.success) {
        console.error(result.error.message);
        return;
    }

    // Set and print locations
    const locations = result.data;
    for (const loc of locations.results) {
        console.log(loc.name);
    }

    // Update pagination URLs
    state.nextLocationsURL = locations.next;
    state.prevLocationsURL = locations.previous;
}
