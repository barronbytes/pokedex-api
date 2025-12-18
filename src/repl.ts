import { State } from "./state.js";


// Parses user input into list of strings
export function cleanInput(input: string): Array<string> {
    const inputSplit = input.split(" ");
    return inputSplit.filter(n => n.length > 0);
}


// Starts the interactive REPL loop and routes user input to commands
export function startREPL(state: State): void {
    const { repl, commands } = state;

    repl.prompt();
    
    repl.on("line", (line) => {
        const words = cleanInput(line);
        const firstWord = words[0]?.toLowerCase() ?? "";
        const command = commands[firstWord] ?? firstWord;

        if(typeof command === "string") {
            console.log(`Unknown command: "${firstWord}". Type "help" for a list of commands.`);
        } else {
            command.callback(state);
        }

        repl.prompt();
    });
}
