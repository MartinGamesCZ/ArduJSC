# ArduJSC

Do you love arduino's but don't want to write program in c++? Me too, so I wrote this.

This is CLI that compiles basic javascript code into c++ code for arduino. It's experimental at this time, it can do only basic codes like arduino blink example and similar.
Please note that this is still experimental.
If you like this and/or you want to support me and development of this and my other projects, consider [donating](https://ko-fi.com/martingames). This is only way i make money.

You can also find it on [npm](https://www.npmjs.com/package/ardujsc)

## Features
What can it do?

- Compile basic javascript code into .ino file

## Docs

#### YouTube video
<video src='https://youtu.be/Io5NYc-U4X4' width='180' />

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
Download this using `npm i ardujsc -g`
You can verify installation by running `ardujsc help`.
You also need to have arduino IDE installed in C:\\Program Files (x86)\\Arduino. You can find it on [here](https://www.arduino.cc/en/Main/Software). Custom installation path will be supported in next version.

## Usage

Firstly, go into folder where you want project to be created.
Then execute `ardujsc created`, this will prompt you to enter project name, main file (must end with .js) and author.
After project is created you can go into folder with your project name.
There should be your main file, open it and you can start programming!

To compile code, execute `ardujsc compile` inside your project folder.
Then enter port of your board (you can find it inside Arduino IDE).
Enter board type (nano, uno, micro, etc) and press enter.
Code will be compiled and uploaded into your board.

## Contact
- email: [martinpetrnp@gmail.com](mailto:martinpetrnp@gmail.com)
- discord: [MartinGames#1477](https://discord.gg/7PY7SnFaF9)
- website: [martingamescz-dev.web.app](https://martingamescz-dev.web.app)
- donate: [ko-fi](https://ko-fi.com/martingames)
