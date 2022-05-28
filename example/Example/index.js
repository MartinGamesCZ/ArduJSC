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
    Serial.println("I je:" + i.toString())
}
