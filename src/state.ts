import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./command-records.js";
import { getPokeAPI } from "./pokeapi.js";


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
}


export type State = {
    repl: Interface;
    commands: Record<string, CLICommand>;
    fetchPokeAPI: typeof getPokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
}


// Initializes and returns the shared application state
export function initState(): State {
    const repl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });

    const commands = getCommands();

    return { 
        repl, 
        commands,
        fetchPokeAPI: getPokeAPI,
        nextLocationsURL: null,
        prevLocationsURL: null
    };
}
