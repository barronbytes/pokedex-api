import { Readable, Writable } from "node:stream";

interface Terminal {
    input: Readable,
    output: Writable,
    prompt: () => void;
}


const terminal: Terminal = {
    input: process.stdin,
    output: process.stdout,
    prompt: () => {
        terminal.output.write("> ");
    }
}


function cleanInput(input: string): Array<string> {
    const inputSplit = input.split(" ");
    return inputSplit.filter(n => n.length > 0);
}


export function startREPL() {
    terminal.prompt()
}
