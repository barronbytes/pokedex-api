export type CLICommand = {
    name: string,
    description: string,
    // function callback(commands: Record<string, CLICommand>): void
    callback: (commands: Record<string, CLICommand>) => void;
}


export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the Pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
    };
}


export function commandExit(commands?: Record<string, CLICommand>) {
    console.log("Closing the Pokedex... Goodbye!");
    process.exit();
}


export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage: \n\n");
    for (const command of Object.values(commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
}
