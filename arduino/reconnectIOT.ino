#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <Arduino_JSON.h>

#define DHT_SENSOR 33
#define DHT_SENSOR_TYPE DHT11
#define LED 13
#define FAN 14
#define DOOR 5
#define WARN 27
#define LIGHT_SENSOR 32

DHT dht(DHT_SENSOR, DHT_SENSOR_TYPE);
JSONVar doc;

// Thiết lập thông tin mạng WiFi
const char* ssid = "FPT Free Wifi";
const char* password = "yeumixoan";

// const char* ssid = "PQ T2";
// const char* password = "nguyenphuquan";

// const char* ssid = "Android 2024";
// const char* password = "12345678";

// Thiết lập thông tin broker MQTT
// const char* mqtt_server = "192.168.0.139";
// const char* mqtt_server = "192.168.1.3";
// const char* mqtt_server = "172.20.10.4";
const char* mqtt_server = "192.168.237.139";
// const char* mqtt_server = "192.168.7.139";
const int mqtt_port = 1886;
const char* mqtt_username = "quan";
const char* mqtt_password = "123";

// Thiết lập topic MQTT
const char* topicLed = "control/led";
const char* topicFan = "control/fan";
const char* topicDoor = "control/door";
const char* topicControl = "turn";
const char* topicConfirmLed = "confirm/led";
const char* topicConfirmFan = "confirm/fan";
const char* topicConfirmDoor = "confirm/door";
// const char* topicConfirm = "confirm";
// const char* topicTemp = "sensor/temp";
// const char* topicHumi = "sensor/humi";
// const char* topicBright = "sensor/bright";
const char* topicSensor = "sensor";
const char* topicWarn = "warn";

WiFiClient espClient;
PubSubClient client(espClient);

long lastMsg = 0;
bool blinkMode = false;


void setupWifi() {
  delay(20);
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.println(topic);
  Serial.print("Message: ");
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  Serial.println(message);

  // Kiểm tra topic và thực hiện câu lệnh
  if (String(topic) == String(topicLed)) {
    Serial.print("LED state: ");
    if (message == "on") {
      Serial.println("ON");
      digitalWrite(LED, HIGH);
    } else {
      Serial.println("OFF");
      digitalWrite(LED, LOW);
    }
    client.publish(topicConfirmLed, message.c_str());
  } else if (String(topic) == String(topicFan)) {
    Serial.print("FAN state: ");
    if (message == "on") {
      Serial.println("ON");
      digitalWrite(FAN, HIGH);
    } else {
      Serial.println("OFF");
      digitalWrite(FAN, LOW);
    }
    client.publish(topicConfirmFan, message.c_str());
  } 
  // else if (String(topic) == String(topicControl)) {
  //   if (message == "on") {
  //     Serial.print("OK");
  //     digitalWrite(LED, HIGH);
  //     digitalWrite(FAN, HIGH);
  //   } else {
  //     Serial.print("OFF");
  //     digitalWrite(LED, LOW);
  //     digitalWrite(FAN, LOW);
  //   }
  // }
  else if(String(topic) == String(topicDoor)){
    Serial.print("DOOR state: ");
    if (message == "on") {
      Serial.println("ON");
      digitalWrite(DOOR, HIGH);
    } else {
      Serial.println("OFF");
      digitalWrite(DOOR, LOW);
    }
    client.publish(topicConfirmDoor, message.c_str());
  }
  // else if(String(topic) == String(topicWarn)) {
  //   digitalWrite(WARN, HIGH);
  //   delay(1000);
  //   digitalWrite(WARN, LOW);
  //   // delay(1000);
  // }
  Serial.println("-----------------------");
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ESP32Client", mqtt_username, mqtt_password)) {
      Serial.println("MQTT connected");
      // Subscribe
      client.subscribe(topicLed);
      client.subscribe(topicFan);
      client.subscribe(topicDoor);
      client.subscribe(topicWarn);
      // client.subscribe(topicControl);
    } else {
      Serial.print("Failed with state: ");
      Serial.print(client.state());
      Serial.println(" try again in 2 seconds");
      delay(2000);
    }
  }
}

void blinkAlert() {
  digitalWrite(WARN, HIGH);
  delay(100);
  digitalWrite(WARN, LOW);
  delay(100);
}

void publishSensor() {
  // Đọc nhiệt độ, độ ẩm
  int humi = (int)dht.readHumidity();
  int temp = (int)dht.readTemperature();

  if (isnan(humi) || isnan(temp)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    // Đọc giá trị ánh sáng
    int bright = 4095 - analogRead(LIGHT_SENSOR);

    Serial.print("Humidity: ");
    Serial.print(humi);
    Serial.print(" %");

    Serial.print("  |  ");

    Serial.print("Temperature: ");
    Serial.print(temp);
    Serial.print(" °C");

    Serial.print("  |  ");

    Serial.print("Brightness: ");
    Serial.print(bright);
    Serial.println(" Lux");
    Serial.println("-----------------------");

    int wind = random(0, 101);

    // Publish dữ liệu
    doc["temperature"] = temp; 
    doc["humidity"] = humi; 
    doc["bright"] = bright;

    // Them 1 cam bien
    doc["randomSensor"] = wind;

    String jsonData = JSON.stringify(doc);
    client.publish(topicSensor, jsonData.c_str()); 

    // String tempStr = "Temparature: " + String(temp) + " °C";
    // String humiStr = "Humidity: " + String(humi) + " %";
    // String brightStr = "Brightness: " + String(bright) + " Lux";
    // client.publish(topicTemp, tempStr.c_str());
    // client.publish(topicHumi, humiStr.c_str());
    // client.publish(topicBright, brightStr.c_str());

    // Warning
    // if(temp > 28){
    //   client.publish(topicWarn, "1");
    // }
    if(wind >= 70) {
      blinkMode = true;
    }
    else {
      blinkMode = false;
    }
  }
}

void setup() {
  Serial.begin(115200);
  // Thiết lập DHT
  dht.begin();

  // Thiết lập chân đầu ra đèn
  pinMode(LED, OUTPUT);
  pinMode(FAN, OUTPUT);
  pinMode(DOOR, OUTPUT);
  pinMode(WARN, OUTPUT);
  // Tắt đèn
  digitalWrite(LED, LOW);
  digitalWrite(FAN, LOW);
  digitalWrite(DOOR, LOW);
  digitalWrite(WARN, LOW);

  setupWifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long now = millis();
  
  if(blinkMode) {
    blinkAlert();
  }

  if(now - lastMsg > 5000) {
    lastMsg = now;
    publishSensor();
  }
  
}
