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
    Serial.println("I je:" + String(i));
};
