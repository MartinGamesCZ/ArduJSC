# ArduJSC

Do you love arduino's but don't want to write program in c++? Me too, so I wrote this.

This is CLI that compiles basic javascript code into c++ code for arduino. It's experimental at this time, it can do only basic codes like arduino blink example and similar.
Please note that this is still experimental.
If you like this and/or you want to support me and development of this and my other projects, consider [donating](https://ko-fi.com/martingames). This is only way i make money.

## Features
What can it do?

- Compile basic javascript code into .ino file

## Docs

### Example

```js
/*
This is the main file of project 'Example' created by MartinGamesCZ.
This is arduino project that was created using ArduJSC.
*/

const { pinMode } = require("./libraries/ardujsc-arduino/index.js");
var Arduino = require("./libraries/ardujsc-arduino/index.js");

var i = 0;
var n = 2;
var t = "string lol"

function setup() {
    pinMode(13, "OUTPUT");
    Serial.begin(9600);
}

function loop() {
    digitalWrite(13, "HIGH");
    delay(i);
    digitalWrite(13, "LOW");
    delay(i);
    i + 8
    Serial.println("I is:" + i.toString())
}
```

This will be converted into this:

```ino
/*
    Example by MartinGamesCZ

    This project was written in javascript and converted to arduino using ArduJSC.

    To upload this file, just open it in arduino ide and upload it to your board.
*/

#include <Arduino.h>
int i = 0;
int n = 2;
String t = "string lol";
void setup() {
    pinMode(13, OUTPUT);
    Serial.begin(9600);
};
void loop() {
    digitalWrite(13, HIGH);
    delay(i);
    digitalWrite(13, LOW);
    delay(i);
    i + 8;
    Serial.println("I is:" + String(i));
};

```

## Instalation

To install this, you need to have nodejs and npm installed.
Download zip file, extract it, go into "compiler" folder and execute `npm install -g`.
You can verify installation by running `ardujsc help`.

## Usage

Firstly, go into folder where you want project to be created.
Then execute `ardujsc created`, this will prompt you to enter project name, main file (must end with .js) and author.
After project is created you can go into folder with your project name.
There should be your main file, open it and you can start programming!

To compile code, execute `ardujsc compile` inside your project folder.
After code is compiled, go into build folder, then folder with name of your project and there is your .ino file. Open it with arduino ide and you can upload it.

## Contact
- email: [martinpetrnp@gmail.com](mailto:martinpetrnp@gmail.com)
- discord: [MartinGames#1477](https://discord.gg/7PY7SnFaF9)
- website: [martingamescz-dev.web.app](https://martingamescz-dev.web.app)
- donate: [ko-fi](https://ko-fi.com/martingames)
