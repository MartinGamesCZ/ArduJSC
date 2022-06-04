/*
    Test by MartinGames

    This project was written in javascript and converted to arduino using ArduJSC.

    To upload this file, just open it in arduino ide and upload it to your board.
*/

#include <Arduino.h>
void setup() {
    pinMode(13, OUTPUT);
};
void loop() {
    digitalWrite(13, LOW);
    delay(1000);
    digitalWrite(13, HIGH);
    delay(1000);
};
