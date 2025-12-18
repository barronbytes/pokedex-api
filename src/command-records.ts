import { CLICommand, State } from "./state.js";
import * as Fnc from "./command-functions.js";


// Registers and returns all available CLI commands
export function getCommands(): Record<string, CLICommand> {
    return {
        help: {
            name: "help",
            description: "Displays a help message.",
            callback: Fnc.commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exits the Pokedex.",
            callback: Fnc.commandExit,
        },
        map: {
            name: "map",
            description: "Returns map data from PokeAPI.",
            callback: Fnc.commandMap,
        }

    };
}
