import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./command-records.js";
import { fetchLocations, fetchLocationArea } from "./pokeapi.js";
import { PokeApiCache } from "./pokecache.js";


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
}


export type State = {
    repl: Interface;
    commands: Record<string, CLICommand>;
    apiLocations: typeof fetchLocations;
    apiLocationArea: typeof fetchLocationArea;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    pokeApiCache: PokeApiCache;
}


// Initializes and returns the shared application state
export function initState(): State {
    const repl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: process.env.APP_PROMPT || "Pokedex > "
    });

    const commands = getCommands();

    return { 
        repl, 
        commands,
        apiLocations: fetchLocations,
        apiLocationArea: fetchLocationArea,
        nextLocationsURL: null,
        prevLocationsURL: null,
        pokeApiCache: new PokeApiCache(parseInt(process.env.CACHE_INTERVAL_MS || "60000"))
    };
}
