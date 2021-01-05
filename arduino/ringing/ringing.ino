#define BUTTON_PIN 5
#define VIBRATE_PIN 3
#define SPEAKER_PIN 2

int serialData;

// Button data
unsigned long previousButtonMillis = 0;
unsigned char readButtonInterval = 100;
bool previousButtonValue = false;

// Ring data
unsigned long previousRingMillis = 0;
const long ringDuration = 50000;
bool isRinging = false;

// Melody data
unsigned long previousMelodyMillis = 0;
const long melodyDuration = 400;
bool loud = false;

// Perodic ping data
unsigned long previousPingMillis = 0;
const long noPingDuration = 110000;
bool receivedPing = true;

// Transfered settings
bool ringEnabled = true;
bool soundEnabled = false;
bool vibrationEnabled = true;

void setup() {
  Serial.begin(115200);
  
  pinMode(BUTTON_PIN, INPUT);
  pinMode(VIBRATE_PIN, OUTPUT);
  pinMode(SPEAKER_PIN, OUTPUT);
}

void loop() {
   handleButton();

  // Read incoming data
  if (Serial.available())  {
    serialData = Serial.read();
    handleIncomingData();
    //Serial.println(serialData);
  }

  // Check if ringing is enabled
  if (isRinging) {
    // Check if the ring timer has been run out
    if (millis() - previousRingMillis >= ringDuration) {
      stopRing();
    }
    // Check if their is a melody switch
    if (soundEnabled) {
      if (millis() - previousMelodyMillis >= melodyDuration) {
        if (loud) {
          noTone(SPEAKER_PIN);
        }
        else {
          tone(SPEAKER_PIN, 600);
        }
        loud = !loud;
        previousMelodyMillis = millis();
      }
    }
  }

  // Check if their has been a ping from the smartphone
  if (receivedPing && (millis() - previousPingMillis >= noPingDuration)) {
    if (shouldRing) {
      startRing();
      receivedPing = false;
    }
  }
}

void handleIncomingData() {
  switch (serialData) {
    case 'r':
      startRing();
      break;
    case 'p':
      stopRing();
      break;
    case 'l':
      vibrationEnabled = false;
      soundEnabled = true;
      break;
    case 's':
      vibrationEnabled = true;
      soundEnabled = false;
      break;
    case 'x':
      ringEnabled = false;
      break;
    case 'z':
      ringEnabled = true;
      break;
    default:
      receivedPing = true;
      previousPingMillis = millis();
      break;
  }
}

void handleButton() {
  // Limit how often we read the button
  if (millis() - previousButtonMillis >= readButtonInterval) {
    bool buttonValue = digitalRead(BUTTON_PIN);
    // Check if button value changed
    if (previousButtonValue != buttonValue) {
      previousButtonValue = buttonValue;
      if (buttonValue == HIGH) {
        // Check if device is already ringing to stop it
        if (isRinging) {
          stopRing();
        }
        else {
          // Write to the serial to trigger the smartphone ring
          Serial.write('a');
        }
      }
    }
    previousButtonMillis = millis();
  }
}

bool shouldRing() {
  if (ringEnabled) {
    return true;
  }
  return false;
}

void startRing() {
  isRinging = true;
  previousRingMillis = millis();
  if (vibrationEnabled) {
    digitalWrite(VIBRATE_PIN, HIGH);
  }
}

void stopRing() {
  isRinging = false;
  previousRingMillis = millis();
  digitalWrite(VIBRATE_PIN, LOW);
  noTone(SPEAKER_PIN);
}
