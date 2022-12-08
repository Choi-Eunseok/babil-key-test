//
// Copyright 2015 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

// FirebaseDemo_ESP8266 is a sample that demo the different functions
// of the FirebaseArduino API.

#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

// Set these to run example.
#define FIREBASE_HOST ""
#define FIREBASE_AUTH ""
#define WIFI_SSID ""
#define WIFI_PASSWORD ""

void setup() {
  Serial.begin(115200);

  WiFi.mode(WIFI_STA);
  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.setString("user/abcd/babil_key/첫번째 오토바이/steal", "false");
}

String data;

void loop() {
  bool Sr = false;
  while (Serial.available()) {
    data = Serial.readString();
    Sr = true;
  }
  if(Sr){
    String dataCopy = data;
    int colonIndex = data.indexOf(":");
    if(colonIndex != -1){
      dataCopy = dataCopy.substring(0,colonIndex);
      Firebase.setString("user/abcd/babil_key/첫번째 오토바이/"+dataCopy, data.substring(colonIndex+1));
    }
  }
}
