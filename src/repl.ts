import readline from "node:readline";


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
    repl.prompt();
    repl.on("line", (line) => {
        const inputs = cleanInput(line);
        if(!inputs.length) {
            repl.prompt();
            return;
        }
        console.log(`Your command was: ${inputs[0].toLowerCase()}`);
        repl.prompt();
    });
}
