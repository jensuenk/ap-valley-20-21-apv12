// D11   >>>  Rx
// D10   >>>  Tx
#include <LowPower.h>;

//pincode 1234

bool noise = false;
bool online = true;
#include <SoftwareSerial.h>// import the serial library

SoftwareSerial hc(10, 11); // RX, TX
int ledpin=13; // led on D13 will show blink on / off
int BluetoothData; // the data given from Computer
int button = 6; //button pin, active low
int buzzerpin = 13; //dc buzzer for beeps

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  hc.begin(9600);
  hc.println("Bluetooth On please press 1 or 0 blink LED ..");
  pinMode(ledpin,OUTPUT);
  pinMode(button, INPUT_PULLUP); //standaard hoog
  pinMode(A0, INPUT); //battery probe
}

bool buttondebounce = false;
long timer = 0;
double battery_voltage;
double battery_percentage;
void loop() {

   LowPower.idle(SLEEP_1S, ADC_OFF, TIMER2_OFF, TIMER1_OFF, TIMER0_OFF, SPI_OFF, USART0_OFF, TWI_OFF); //low power mode for 8 seconds
                
    //commands lezen van de bluetooth module
   if (hc.available()){
      BluetoothData=hc.read();
      //work with the received data
   if(!hc.available()){
    if(noise == true){
      online = false;
      digitalWrite(buzzerpin, true);
    }
   }
      
  if(BluetoothData=='1'){   // if number 1 pressed ....
      digitalWrite(ledpin,1);
      hc.println("BUZZER  On D13 ON ! ");
  }
  if (BluetoothData=='0'){// if number 0 pressed ....
      digitalWrite(ledpin,0);
      hc.println("BUZZER  On D13 Off ! ");
  }
  if (BluetoothData=='2'){// if number 0 pressed ....
      digitalWrite(ledpin,0);
      noise = false;
      hc.println("buzzer off silent mode");
  }
    if (BluetoothData=='3'){// if number 0 pressed ....
      digitalWrite(ledpin,0);
      noise = true;
      hc.println("buzzer on loud mode");
  }

}
//end commands
//button code
  if(digitalRead(button) == false){ //if button pressed
    //Serial.println("pressed");
    digitalWrite(buzzerpin, false); //stop alarm
    if(buttondebounce == false){ //if loop hasn't been completed once
      hc.println("ringing"); //send alarm to phone
    }
    buttondebounce = true;
    
  }else{
    buttondebounce = false;
  }
delay(1);// prepare for next data ... //wait here to reduce cpu usage, and save some power
timer += 1;
if(timer > 60){ //every 60seconds the battery percentage gets measured
  battery_voltage = ((double)analogRead(A0) / 1024) * 4.2;
  battery_percentage = (((double)battery_voltage - 3)/ 1.2) * 100; //returns battery percentage (battery voltage between 3 and 4.2V)
  if(battery_percentage < 3){
    //battery less than empty
    hc.println("battery_dead");
  }
  timer = 0;
  hc.println(battery_percentage);
}
}
