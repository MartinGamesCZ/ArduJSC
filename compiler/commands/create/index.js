var Command = require("../../constructors/command.js");
const fs = require("fs");
const CommandHandler = require("../../handlers/command.handler.js");
const Project = require("../../hooks/project.hook.js");

const projectData = {}

var create = new Command(
  "create",
  "Creates a new project",
  ["mk"],
  "create",
  function (args) {
    return new Promise(async (resolve, reject) => {
      ask(0)
    });
  }
);

function createProject(name, file, author) {
  var project = new Project()
  project.create({
    name: name,
    file: file,
    author: author
  })
}

async function ask(id) {
  var handler = new CommandHandler();

  var questions = [
    {
      name: "name",
      question: "Project name",
      default: ""
    },
    {
      name: "file",
      question: "Main file",
      default: "index.js"
    },
    {
      name: "author",
      question: "Author",
      default: ""
    },
  ]

  var data = await handler.getUserInput(questions[id].question, questions[id].default).catch(() => ask(id))
  if (data) {
    projectData[questions[id].name] = data
    if (id < questions.length - 1) return ask(id + 1)
    createProject(projectData.name, projectData.file, projectData.author)
  }
}

module.exports = create;
