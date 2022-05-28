#!/usr/bin/env node
const CommandHandler = require("./handlers/command.handler");
const fs = require("fs");

const [, , ...args] = process.argv;

var handler = new CommandHandler();

main()


async function main() {

  await loadCommands();

  handler
    .execute(args[0], args.slice(1))
    .then(console.log)
    .catch(console.error);
}

async function loadCommands() {
  var commands = await fs.readdirSync(__dirname + "/commands");
  commands.forEach((command) =>
    handler.register(require("./commands/" + command + "/index.js"))
  );
}
