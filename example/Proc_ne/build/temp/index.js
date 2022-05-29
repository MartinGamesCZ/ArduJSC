/*
This is the main file of project 'Proc_ne' created by MartinSucks.
This is arduino project that was created using ArduJSC.
*/

var Arduino = require("C:/Users/marti/OneDrive/Plocha/Programování/Elektronika/arduino/ArduJSC/example/proc_ne/libraries/ardujsc-arduino/index.js");

function setup() {
    Serial.begin(9600);
}

function loop() {
    delay(1000);
    Serial.println("Bruh");
}

module.exports = { setup, loop }