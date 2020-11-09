// D11   >>>  Rx
// D10   >>>  Tx

//pincode 1234

bool noise = false;
bool online = false;
#include <SoftwareSerial.h>// import the serial library

SoftwareSerial hc(10, 11); // RX, TX
int ledpin=13; // led on D13 will show blink on / off
int BluetoothData; // the data given from Computer
int button = 7;

void setup() {
  // put your setup code here, to run once:
  hc.begin(9600);
  hc.println("Bluetooth On please press 1 or 0 blink LED ..");
  pinMode(ledpin,OUTPUT);
  pinMode(button, INPUT);
}

bool buttondebounce = false;
void loop() {
  // put your main code here, to run repeatedly:
   if (hc.available()){
      BluetoothData=hc.read();
      //work with the received data
      

      
   if(BluetoothData=='1'){   // if number 1 pressed ....
   digitalWrite(ledpin,1);
   hc.println("LED  On D13 ON ! ");
   }
  if (BluetoothData=='0'){// if number 0 pressed ....
  digitalWrite(ledpin,0);
   hc.println("LED  On D13 Off ! ");a
  }
  if(digitalRead(button) == true){ //if button pressed
    if(buttondebounce == false){ //if loop hasn't been completed once
      hc.println("alarm"); //send alarm to phone
    }
    buttondebounce = true;
    
  }
}
delay(100);// prepare for next data ...
}
