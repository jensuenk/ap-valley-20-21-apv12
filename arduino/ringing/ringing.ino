#define BUTTON_PIN 5

unsigned long lastReadTime = 0;
unsigned char readInterval = 100;
bool previousButtonValue = false;

void setup() {
  Serial.begin(115200);  //initial the Serial
  pinMode(BUTTON_PIN, INPUT);
}

void loop() {
  // limit how often we read the button
  if (millis() - lastReadTime > readInterval) {
    readButton();
    lastReadTime = millis();
  }

  if (Serial.available())  {
    Serial.write(Serial.read());
  }
}

void readButton() {
  bool buttonValue = digitalRead(BUTTON_PIN);
  
  if (previousButtonValue != buttonValue) {
    previousButtonValue = buttonValue;
    if (buttonValue == HIGH) {
      Serial.write('a');
    }
  }
}
