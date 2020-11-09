#include<Arduino.h>

// include the library
#include <RadioLib.h>

// HC05 has the following connections:
// TX pin: 1
// RX pin: 0
HC05 bluetooth = new Module(1, 0);

// or using RadioShield
// https://github.com/jgromes/RadioShield
//HC05 bluetooth = RadioShield.ModuleA;

void setup() {
  Serial.begin(9600);

  // initialize HC05
  // baudrate:  9600 baud
  bluetooth.begin(9600);
}

void loop() {
  // HC05 supports all methods of the Serial class
  // read data incoming from Serial port and write them to Bluetooth
  while (Serial.available() > 0) {
    bluetooth.write(Serial.read());
  }

  // read data incoming from Bluetooth and write them to Serial port
  while (bluetooth.available() > 0) {
    Serial.write(bluetooth.read());
  }
}