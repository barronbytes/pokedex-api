import { Readable, Writable } from "node:stream";

interface Terminal {
    input: Readable,
    output: Writable,
    prompt: () => void;
    on: (event: "line", callback: (userInput: string) => void) => void;
}


const terminal: Terminal = {
    input: process.stdin,
    output: process.stdout,
    prompt: () => {
        terminal.output.write("Pokedex > ");
    }
}


function cleanInput(input: string): Array<string> {
    const inputSplit = input.split(" ");
    return inputSplit.filter(n => n.length > 0);
}


export function startREPL() {
    terminal.prompt()
}
