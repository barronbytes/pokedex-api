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


export function commandMap(state: State): void {
    console.log("TO DO.");
}
