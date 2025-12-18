import { CLICommand, State } from "./state.js";


// Registers and returns all available CLI commands
export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the Pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
    };
}


// Close the readline interface to stop the REPL loop before exiting the application
export function commandExit(state: State): void {
    console.log("Closing the Pokedex... Goodbye!");
    state.repl.close();
    process.exit();
}


// Display usage information for all CLI commands
export function commandHelp(state: State): void {
    console.log("Welcome to the Pokedex!");
    console.log("Usage: \n\n");
    for (const command of Object.values(state.commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
}
