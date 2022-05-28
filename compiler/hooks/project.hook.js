const fs = require("fs");
const path = require("path");
const Compiler = require("../compiler");

class Project {
  constructor(id = "") {
    this.data = {};
    if (id != "") {
      fs.readFile(
        path.join(__dirname, "..", "config", "projects.json"),
        (err, data) => {
          if (err) throw err;
          this.data = JSON.parse(data)[id];
        }
      );
    }
  }

  create(config) {
    return new Promise(async (resolve, reject) => {
      console.log("\n");
      var loading = (function () {
        var P = ["\\", "|", "/", "-"];
        var x = 0;
        return setInterval(function () {
          process.stdout.write(
            "\r" + P[x++] + " Creating project, please wait..."
          );
          x &= 3;
        }, 150);
      })();

      console.log("Started creation of project...");
      console.log("Creating project directory...");
      await fs.mkdirSync(config.name);
      console.log("Creating project files...");
      await fs.writeFileSync(
        path.join(config.name, config.file),
        `/*
This is the main file of project '${config.name}' created by ${config.author}.
This is arduino project that was created using ArduJSC.
*/

var Arduino = require("./libraries/ardujsc-arduino/index.js");

function setup() {

}

function loop() {

}
`
      );
      await fs.writeFileSync(
        path.join(config.name, "package.json"),
        JSON.stringify(
          {
            name: config.name,
            version: "1.0.0",
            description: "",
            main: config.file,
            author: config.author,
          },
          null,
          4
        )
      );
      await fs.writeFileSync(
        path.join(config.name, "README.md"),
        `# ${config.name}`
      );
      await fs.writeFileSync(
        path.join(config.name, "ardujsc.config.json"),
        JSON.stringify(config, null, 4)
      );

      console.log("Downloading libraries...");
      await fs.mkdirSync(config.name + "/libraries");
      await fs.mkdirSync(config.name + "/libraries/ardujsc-arduino");
      await fs.copyFileSync(
        path.join(
          __dirname,
          "..",
          "project",
          "libraries",
          "ardujsc-arduino",
          "index.js"
        ),
        path.join(config.name + "/libraries", "ardujsc-arduino", "index.js")
      );

      console.log("Project was created successfully!");
      process.exit(0);
    });
  }

  compile() {
    return new Promise(async (resolve, reject) => {
      console.log("\n");
      var loading = (function () {
        var P = ["\\", "|", "/", "-"];
        var x = 0;
        return setInterval(function () {
          process.stdout.write(
            "\r" + P[x++] + " Compiling project, please wait..."
          );
          x &= 3;
        }, 150);
      })();

      console.log("Started compilation of project...");
      console.log("Checking file metadata...");
      var data = JSON.parse(
        await fs.readFileSync("ardujsc.config.json", "utf8")
      );

      console.log("Creating directories...");
      if (fs.existsSync("build"))
        await fs.rmSync("build", { recursive: true, force: true });
      await fs.mkdirSync("build/" + data.name, { recursive: true });
      await fs.mkdirSync("build/temp");

      console.log("Creating files...");
      await fs.writeFileSync(
        "build/" + data.name + "/" + data.name + ".ino",
        `/*
    ${data.name} by ${data.author}

    This project was written in javascript and converted to arduino using ArduJSC.

    To upload this file, just open it in arduino ide and upload it to your board.
*/`
      );

      await fs.writeFileSync(
        "build/temp/index.js",
        (await fs
          .readFileSync(data.file, "utf8")
          .replaceAll("./", process.cwd().replaceAll("\\", "/") + "/")) +
          "\nmodule.exports = { setup, loop }"
      );

      var compiled = await Compiler.compile("build/temp/index.js", data);

      process.exit(0);
    });
  }
}

module.exports = Project;
