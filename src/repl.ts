import { State } from "./state.js";


export function cleanInput(input: string): Array<string> {
    const inputSplit = input.split(" ");
    return inputSplit.filter(n => n.length > 0);
}


export function startREPL(state: State) {
    const { repl, commands } = state;

    state.repl.prompt();
    
    state.repl.on("line", (line) => {
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
