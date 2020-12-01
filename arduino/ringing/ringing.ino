void setup() {
  Serial.begin(115200);  //initial the Serial
// D11   >>>  Rx
// D10   >>>  Tx
#include <LowPower.h>;

//pincode 1234

bool noise = false;
bool online = true;
//#include <SoftwareSerial.h>// import the serial library

//SoftwareSerial hc(10, 11); // RX, TX
int ledpin=4; // led on D13 will show blink on / off
int BluetoothData; // the data given from Computer
int button = 5; //button pin, active low
int buzzerpin = 4; //dc buzzer for beeps

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  //hc.begin(9600);
  Serial.println("Bluetooth On");
  pinMode(ledpin,OUTPUT);
  pinMode(button, INPUT_PULLUP); //standaard hoog
  pinMode(A0, INPUT); //battery probe

  //saving power by disabling timers we don't need
  
}

void loop() {
   LowPower.idle(SLEEP_1S, ADC_OFF, TIMER2_OFF, TIMER1_OFF, TIMER0_OFF, SPI_OFF, USART0_ON, TWI_OFF); //low power mode for 8 seconds
                
    //commands lezen van de bluetooth module
   if (Serial.available() > 0) {
      // read the incoming byte:
      BluetoothData = Serial.read();
      Serial.println(BluetoothData, DEC);
   }
   if(!Serial.available()){
    if(noise == true){
      online = false; 
      digitalWrite(buzzerpin, true);
      Serial.println("alarm");
    }
   }
      
  if(BluetoothData=='1'){   // if number 1 pressed ....
      digitalWrite(ledpin,1);
      Serial.println("BUZZER  On D13 ON ! ");
  }
  if (BluetoothData=='0'){// if number 0 pressed ....
      digitalWrite(ledpin,0);
      Serial.println("BUZZER  On D13 Off ! ");
  }
  if (BluetoothData=='2'){// if number 0 pressed ....
      digitalWrite(ledpin,0);
      noise = false;
      Serial.println("buzzer off silent mode");
  }
    if (BluetoothData=='3'){// if number 0 pressed ....
      digitalWrite(ledpin,0);
      noise = true;
      Serial.println("buzzer on loud mode");
  }
  BluetoothData = '4';


//end commands
//button code
  if(digitalRead(button) == false){ //if button pressed
    //Serial.println("pressed");
    digitalWrite(buzzerpin, false); //stop alarm
      if(buttondebounce == false){ //if loop hasn't been completed once
        Serial.println("ringing"); //send alarm to phone
      }
      buttondebounce = true;
    }
    else{
     buttondebounce = false;
  }
delay(100);// prepare for next data ... //wait here to reduce cpu usage, and save some power
timer += 1;
  if(timer > 60){ //every 60=seconds the battery percentage gets measured
    battery_voltage = ((double)analogRead(A0) / 1024) * 4.2;
    battery_percentage = (((double)battery_voltage - 3)/ 1.2) * 100; //returns battery percentage (battery voltage between 3 and 4.2V)
      if(battery_percentage < 3){
        //battery less than empty
        Serial.println("battery_dead");
      }
    timer = 0;
    Serial.println(battery_percentage);
    }
}
