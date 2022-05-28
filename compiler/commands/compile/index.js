var Command = require("../../constructors/command.js");
const fs = require("fs");
const CommandHandler = require("../../handlers/command.handler.js");
const Project = require("../../hooks/project.hook.js");

const projectData = {}

var compile = new Command(
  "compile",
  "This will compile project into .ino file",
  ["c"],
  "compile",
  function (args) {
    return new Project().compile();
  }
)

module.exports = compile;
