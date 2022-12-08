#include <SoftwareSerial.h>
#include "SNIPE.h"

#define TXpin 11
#define RXpin 10
#define ATSerial Serial

SNIPE SNIPE(ATSerial);

//16byte hex key
String lora_app_key = "11 22 33 44 55 66 77 88 99 aa bb cc dd ee ff 00";

int blueTx = 2;
int blueRx = 3;
SoftwareSerial mySerial(blueTx, blueRx);

void setup()
{
  ATSerial.begin(115200);
  mySerial.begin(9600);
  
  while(ATSerial.read()>= 0) {}
  while(!ATSerial);

  pinMode(8, INPUT_PULLUP);
  
  pinMode(13, OUTPUT);

  /* SNIPE LoRa Initialization */
  if (!SNIPE.lora_init()) {
    //DebugSerial.println("SNIPE LoRa Initialization Fail!");
    while (1);
  }

  /* SNIPE LoRa Set App Key */
  if (!SNIPE.lora_setAppKey(lora_app_key)) {
    //DebugSerial.println("SNIPE LoRa app key value has not been changed");
  }
  
  /* SNIPE LoRa Set Frequency */
  if (!SNIPE.lora_setFreq(LORA_CH_1)) {
    //DebugSerial.println("SNIPE LoRa Frequency value has not been changed");
  }

  /* SNIPE LoRa Set Spreading Factor */
  if (!SNIPE.lora_setSf(LORA_SF_7)) {
    //DebugSerial.println("SNIPE LoRa Sf value has not been changed");
  }

  /* SNIPE LoRa Set Rx Timeout 
   * If you select LORA_SF_12, 
   * RX Timout use a value greater than 5000  
  */
  if (!SNIPE.lora_setRxtout(5000)) {
    //DebugSerial.println("SNIPE LoRa Rx Timout value has not been changed");
  }
  digitalWrite(13,LOW);
}

char currentLed = 'L';
int prevVal = HIGH;
int currVal;
bool stealStatus = false;
int pos = 0;

void loop()
{
  while (mySerial.available()) {
    char data = mySerial.read();
    if (data == 'k') {
      if (currentLed == 'L') {
        digitalWrite(13, HIGH);
        currentLed = 'H';
        mySerial.write(currentLed);
      }
      else if (currentLed == 'H') {
        digitalWrite(13, LOW);
        currentLed = 'L';
        mySerial.write(currentLed);
      }
    }
    if (data == 's') {
      mySerial.write(currentLed);
    }
  }
  currVal = digitalRead(8);
  if(currVal == LOW){
    stealStatus = true;
  }
  if(stealStatus){
    SNIPE.lora_send("pos:"+String(pos));
    pos++;
    String ver = SNIPE.lora_recv();
    if(ver == "false"){
      stealStatus = false;
    }
    delay(5000);
  }
}
