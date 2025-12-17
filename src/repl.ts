import readline from "node:readline";
import { CLICommand, getCommands, commandExit } from "./commands.js"


const repl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Pokedex > "
});


export function cleanInput(input: string): Array<string> {
    const inputSplit = input.split(" ");
    return inputSplit.filter(n => n.length > 0);
}


export function startREPL() {
    const commands = getCommands();
    repl.prompt();
    repl.on("line", (line) => {
        const words = cleanInput(line);
        const firstWord = words[0]?.toLowerCase() ?? "";
        const command = commands[firstWord] ?? firstWord;

        if(typeof command === "string") {
            console.log(`Unknown command: "${firstWord}". Type "help" for a list of commands.`);
        } else {
            command.callback(commands);
        }

        repl.prompt();
    });
}
