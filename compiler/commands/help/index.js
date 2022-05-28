var Command = require('./../../constructors/command.js');
const fs = require('fs');
const CommandHandler = require('../../handlers/command.handler.js');

var help = new Command("help", "Shows a list of commands", ["h"], "help", function (args) {
  return new Promise(async (resolve, reject) => {
    var commands = new CommandHandler().commands
    Object.keys(commands).forEach((command) => {
      var cmd = commands[command];
      var usage = cmd.usage ? "\tUsage: ardujsc " + cmd.usage : "";
      console.log(`${cmd.name.toUpperCase()}:\n\t${cmd.description}\n${usage}`);
    })
  })  
});

module.exports = help