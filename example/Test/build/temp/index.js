/*
This is the main file of project 'Test' created by MartinGames.
This is arduino project that was created using ArduJSC.
*/

var Arduino = require("C:/Users/marti/OneDrive/Plocha/Programování/Elektronika/arduino/ArduJSC/example/Test/libraries/ardujsc-arduino/index.js");

function setup() {
    pinMode(13, "OUTPUT")
}

function loop() {
    digitalWrite(13, "LOW")
    delay(1000)
    digitalWrite(13, "HIGH")
    delay(1000)
}

module.exports = { setup, loop }