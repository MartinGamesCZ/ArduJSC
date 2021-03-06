const path = require("path");
const fs = require("fs");
var Functions = require("./project/libraries/ardujsc-arduino/index.js");
const { exec } = require("child_process");

const Compiler = {
  compile: async function (file, settings = {}) {
    return new Promise(async (resolve, reject) => {
      var { loop, setup } = require(path.join(process.cwd(), "/", file));
      var content = await fs.readFileSync(file, "utf8");
      content = "#include <Arduino.h>\n" + content;
      content = content.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "");
      content = content.replace(/^\s*\n/gm, "");
      content = content.replace(
        /(var|const|let) .* = require\(.*\)(.*(\n)|)/gm,
        ""
      );
      content = content.replace(/function setup\(.*\)/gm, "void setup()");
      content = content.replace(/function loop\(.*\)/gm, "void loop()");
      content = content.replace(/"(OUTPUT|INPUT|HIGH|LOW)"/gim, "$1;");
      content = content
        .replaceAll("\n", ";\n")
        .replaceAll(";;\n", ";\n")
        .replaceAll(/((>);|({);|;(\)))/gm, "$2$3$4");
      content = content.replace(/module.exports = .*/, "");

      var a = content.match(/(var|let|const) ([a-zA-Z]*)(\s|)=(\s|)(.*);$/gm);
      if (a && a.length > 0)
        a.forEach((variable) => {
          var type =
            variable
              .replace(/var .* = (.*|"[a-zA-Z]*");/gm, "$1")
              .match(/^[0-9]+$/) != null
              ? "int"
              : "String";
          var name = variable.replace(/var ([a-zA-Z]*) .*$/gm, "$1");
          var value = variable.replace(/var .* = (.*);$/gm, "$1");
          content = content.replace(
            variable,
            type + " " + name + " = " + value + ";"
          );
        });
      content = content.replace(/([a-zA-Z]*).toString\(\)/gm, "String($1)");
      fs.writeFileSync(
        "build/" + settings.name + "/" + settings.name + ".ino",
        (await fs.readFileSync(
          "build/" + settings.name + "/" + settings.name + ".ino",
          "utf-8"
        )) +
          "\n\n" +
          content
      );
      resolve(content);
    });
  },
  avrDudeCompile: async function (data, settings = {}) {
    return new Promise(async (resolve, reject) => {
      await exec(
        '"C:\\Program Files (x86)\\Arduino\\arduino_debug.exe" --upload "build/' +
          settings.name +
          "/" +
          settings.name +
          '.ino" --port ' +
          settings.port +
          " --board " +
          settings.board,
        (err, stdout, stderr) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log("\n");
          console.log(stdout);
          resolve();
        }
      );
    });
  },
};

module.exports = Compiler;
