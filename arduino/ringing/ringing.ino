#include <LowPower.h>;

//pincode 1234
int alarmtimer = 300; //alarm counter 5 minutes resets upon receiving data of any kind
bool noise = false;
bool online = true;

int ledpin=4; // led on D13 will show blink on / off
int BluetoothData; // the data given from Computer
int button = 5; //button pin, active low
int buzzerpin = 4; //dc buzzer for beeps

double longitude[5] = {0,0,0,0,0};
double lattitude[5] = {0,0,0,0,0};
const double *currentLattitude;
const double *currentLongitude; //save to flash the current position

// tijd start, loud mode, silent mode tijd stopt
long timer_clock = 0; // 1440 minutes in a day
int loudtimes[10] = {770,0,0,0,0,0,0,0,0,0}; //time when the device should switch to loud mode
int silenttimes[10] = {800,0,0,0,0,0,0,0,0,0}; //time when the device should switch to silent mode
int receivedData;

//Store location
void receive_current_lat_long(){
  while(!Serial.available() > 0) {};
  receivedData = Serial.readString().toInt();//convert the recieved string into a number (max number 16 bits)
  Serial.println(receivedData);
  currentLattitude = receivedData / 10;

  while(!Serial.available() > 0) {};
  receivedData = Serial.readString().toInt();//convert the recieved string into a number (max number 16 bits)
  Serial.println(receivedData);
  currentLongitude = receivedData / 10;
  
}

void receive_lat_long(){
   for (int i = 0; i<5; i++){
      receivedData = "";
      while(!Serial.available() > 0) {};//Wait for something to appear in the buffer device will not go back to normal operation without this
      receivedData = Serial.readString().toInt();//convert the recieved string into a number (max number 16 bits)
      Serial.println(receivedData);
      longitude[i] = receivedData / 10;
    }
   for (int i = 0; i<5; i++){
      receivedData = "";
      while(!Serial.available() > 0) {};//Wait for something to appear in the buffer device will not go back to normal operation without this
      receivedData = Serial.readString().toInt();//convert the recieved string into a number (max number 16 bits)
      Serial.println(receivedData);
      lattitude[i] = receivedData / 10;
    }
}

void receivetimes(){
  Serial.println("ontimes");
  delay(25);
    for (int i = 0; i<10; i++){
      receivedData = "";
      while(!Serial.available() > 0) {};//Wait for something to appear in the buffer device will not go back to normal operation without this
      receivedData = Serial.readString().toInt();//convert the recieved string into a number (max number 16 bits)
      Serial.println(receivedData);
      loudtimes[i] = receivedData;
    }
  Serial.println("offtimes");
    for (int i = 0; i<10; i++){
      receivedData = "";
      while(!Serial.available() > 0) {};//Wait for something to appear in the buffer device will not go back to normal operation without this
      receivedData = Serial.readString().toInt();
      Serial.println(receivedData);
      silenttimes[i] = receivedData;
      
 }
}
 void printtimes(){
      for (int i = 0; i<10; i++){
      Serial.println(loudtimes[i]);
    }
 }

void setclock(){ //current time in seconds
  Serial.println("clock");
  delay(100);
  receivedData = "";
  while(!Serial.available() > 0) {};//Wait for something to appear in the buffer device will not go back to normal operation without this
  receivedData = Serial.readString().toInt();
  timer_clock = receivedData;
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  //hc.begin(9600);
  //Serial.println("Bluetooth On");
  pinMode(ledpin,OUTPUT);
  pinMode(button, INPUT_PULLUP); //standaard hoog
  pinMode(A0, INPUT); //battery probe
  Serial.setTimeout(10);
  //saving power by disabling timers we don't need
  
}

bool buttondebounce = false;
long timer = 0;
double battery_voltage;
double battery_percentage;

double lat_low;
double lat_high;
double long_low;
double long_high;
void compare_locations(){ //silent mode is active in these locations
  for(int i = 0;  i<5; i ++){
    lat_low = lattitude[i] - 1;
    lat_high = lattitude[i] + 1;
    long_low = longitude[i] - 1;
    long_high = longitude[i] + 1;
    //if the current location is somewhere in between any of the coördinates the device will enter silent mode else it will leave it up to the timer
    if(*currentLattitude > lat_low && *currentLattitude < lat_high && *currentLongitude > long_low && *currentLongitude < long_high){
      noise = false;
      break;
    }
    else{
      noise = true;
    }
  }
}

void loop() {

   //LowPower.idle(SLEEP_1S, ADC_OFF, TIMER2_OFF, TIMER1_OFF, TIMER0_OFF, SPI_OFF, USART0_ON, TWI_OFF); //low power mode for 1 seconds commented out to keep time afloat
   
   //alarmtimer -= 1; //for debugging comment, uncomment in build
   if(alarmtimer < 1){
    if(noise == true){
      digitalWrite(buzzerpin, true);
      alarmtimer = 300;
    }
   }
                
    //commands lezen van de bluetooth module
   if (Serial.available() > 0) {
      // read the incoming byte:
      BluetoothData = Serial.read();
      Serial.println(BluetoothData);
   }
   if(!Serial.available()){
    if(noise == true && alarmtimer < 1){
      digitalWrite(buzzerpin, true);
      Serial.println("alarm");
    }
  }
      
  if(BluetoothData=='r'){   // if number 1 pressed ....
      digitalWrite(ledpin,1);
      Serial.println("BUZZER  On D13 ON ! ");
  }
  if (BluetoothData=='h'){// if number 0 pressed ....
      digitalWrite(ledpin,0);
      Serial.println("BUZZER  On D13 Off ! ");
  }
  if (BluetoothData=='s'){// if number 0 pressed ....
      digitalWrite(ledpin,0);
      noise = false;
      Serial.println("buzzer off silent mode");
  }
  if (BluetoothData=='l'){// if number 0 pressed ....
      digitalWrite(ledpin,0);
      noise = true;
      Serial.println("buzzer on loud mode");
  }
  if (BluetoothData=='t'){
    receivetimes();
  }
  if (BluetoothData=='c'){
    setclock();
  }
  if(BluetoothData=='p'){
    printtimes();
  }
  if(BluetoothData=='a'){
    //location saving
    receive_lat_long();
  }
  if(BluetoothData=='b'){
    receive_current_lat_long();
  }
  /*
  if(bluetoothData = long){
    //setup loud and silent times
  }
  */
  if(BluetoothData != '/'){
    alarmtimer = 300; //alarmtimer werkt
    //Serial.println(alarmtimer);
  }else{
    alarmtimer -= 1;
  }
  BluetoothData = '/'; //


//end commands
//button code
  if(digitalRead(button) == false){ //if button pressed
    //Serial.println("pressed");
    digitalWrite(buzzerpin, false); //stop alarm
      if(buttondebounce == false){ //if loop hasn't been completed once
        Serial.println("ringing"); //send alarm to phone
        digitalWrite(buzzerpin, false);
      }
      buttondebounce = true;
    }
    else{
     buttondebounce = false;
  }
delay(100);// prepare for next data ... //wait here to reduce cpu usage, and save some power
timer += 1;

  if(timer == 10){
    timer_clock += 1; //keep track of the time
    for(int i =0; i<10; i++){
      if(timer_clock == loudtimes[i]){
        noise = true;
      }
      if(timer_clock == silenttimes[i]){
        noise = false;
      }
    }
  }//auto silence time

  
  if(timer > 6000){ //every 60=seconds the battery percentage gets measured
    if(timer_clock == 1440){
      timer_clock = 0; //midnight
    }
    timer_clock += 1; //keep the time of day relatively accurate
    battery_voltage = ((double)analogRead(A0) / 1024) * 4.2;
    battery_percentage = (((double)battery_voltage - 3)/ 1.2) * 100; //returns battery percentage (battery voltage between 3 and 4.2V)
      if(battery_percentage < 3){
        //battery less than empty
        Serial.println("battery_dead");
      }
    timer = 0;
    if(battery_percentage < 0){
      battery_percentage = 0;
    }
    Serial.print(battery_percentage);
    Serial.println("%");
    }
}
