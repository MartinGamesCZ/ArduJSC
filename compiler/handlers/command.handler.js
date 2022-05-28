var commands = {};

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("close", function () {
  console.log("\nAction was cancelled.");
  process.exit(0);
});

class CommandHandler {
  constructor() {
    this.commands = commands;
  }

  register(command) {
    commands[command.name] = {
      name: command.name,
      description: command.description,
      aliases: command.aliases,
      usage: command.usage,
      execute: command.execute,
    };
  }

  execute(name, args) {
    return new Promise((resolve, reject) => {
      if (!name) name = "help";
      if (commands[name])
        return commands[name].execute(args).then(resolve).catch(reject);
      reject(
        `Unknown command: ${name}! Type "ardujsc help" for a list of commands.`
      );
    });
  }

  getUserInput(prompt, replacement = "") {
    return new Promise(async (resolve, reject) => {
      var ending = replacement == "" ? ": " : " (" + replacement + "): ";

      rl.question(prompt + ending, (answer) => {
        if (answer == "" && replacement == "")
          return reject("No input was given.");
        resolve(answer == "" ? replacement : answer);
      });
    });
  }
}

module.exports = CommandHandler;
