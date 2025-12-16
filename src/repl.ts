import { Readable, Writable } from "node:stream";

interface Terminal {
    input: Readable,
    output: Writable,
    prompt: () => void;
}


export function cleanInput(input: string): Array<string> {
    const inputSplit = input.split(" ");
    return inputSplit.filter(n => n.length > 0);
}

export const startREPL: Terminal = {
    input: process.stdin,
    output: process.stdout,
    prompt: () => {
        startREPL.output.write("> ");
    }
}

startREPL.prompt()
