import { State } from "./state.js";


// Parses user input into list of strings
export function cleanInput(input: string): Array<string> {
    const inputSplit = input.split(" ");
    return inputSplit.filter(n => n.length > 0);
}


// Starts the interactive REPL loop and routes user input to commands
export async function startREPL(state: State): Promise<void> {
    const { repl, commands } = state;

    repl.prompt();
    
    repl.on("line", async (line) => {
        const words = cleanInput(line);
        const firstWord = words[0]?.toLowerCase() ?? "";
        const args = words.slice(1);
        const command = commands[firstWord] ?? firstWord;

        if(typeof command === "string") {
            console.log(`Unknown command: "${firstWord}". Type "help" for a list of commands.`);
        } else {
            try {
                await command.callback(state, ...args);   // <-- await here
            } catch (err) {
                console.error("Command failed:", err);
            }
        }

        repl.prompt();
    });
}
