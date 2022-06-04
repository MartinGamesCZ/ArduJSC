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
    return ask(0)
  }
)

async function ask(id) {
  var handler = new CommandHandler();

  var questions = [
    {
      name: "port",
      question: "Board port",
      default: ""
    },
    {
      name: "board",
      question: "Board type",
      default: "uno"
    }
  ]

  var data = await handler.getUserInput(questions[id].question, questions[id].default).catch(() => ask(id))
  if (data) {
    projectData[questions[id].name] = data
    if (id < questions.length - 1) return ask(id + 1)
    new Project().compile(projectData.port, projectData.board);
  }
}

module.exports = compile;
