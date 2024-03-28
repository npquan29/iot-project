#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <Arduino_JSON.h>

#define DHT_SENSOR 33
#define DHT_SENSOR_TYPE DHT11
#define LED 13
#define FAN 14
#define LIGHT_SENSOR 32

DHT dht(DHT_SENSOR, DHT_SENSOR_TYPE);
JSONVar doc;

// Thiết lập thông tin mạng WiFi
const char* ssid = "FPT Free Wifi";
const char* password = "yeumixoan";

// Thiết lập thông tin broker MQTT
const char* mqtt_server = "192.168.7.139";
const int mqtt_port = 1886;
const char* mqtt_username = "quan";
const char* mqtt_password = "123";

// Thiết lập topic MQTT
const char* topicLed = "control/led";
const char* topicFan = "control/fan";
const char* topicControl = "turn";
const char* topicConfirmLed = "confirm/led";
const char* topicConfirmFan = "confirm/fan";
// const char* topicConfirm = "confirm";
// const char* topicTemp = "sensor/temp";
// const char* topicHumi = "sensor/humi";
// const char* topicBright = "sensor/bright";
const char* topicSensor = "sensor";

WiFiClient espClient;
PubSubClient client(espClient);

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
  } else if (String(topic) == String(topicControl)) {
    if (message == "on") {
      Serial.print("OK");
      digitalWrite(LED, HIGH);
      digitalWrite(FAN, HIGH);
    } else {
      Serial.print("OFF");
      digitalWrite(LED, LOW);
      digitalWrite(FAN, LOW);
    }
  }
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
      // client.subscribe(topicControl);
    } else {
      Serial.print("Failed with state: ");
      Serial.print(client.state());
      Serial.println(" try again in 2 seconds");
      delay(2000);
    }
  }
}

void publishSensor() {
  // Đọc nhiệt độ, độ ẩm
  int humi = (int)dht.readHumidity();
  int temp = (int)dht.readTemperature();

  if (isnan(humi) || isnan(temp)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    // Đọc giá trị ánh sáng
    int bright = analogRead(LIGHT_SENSOR);

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

    // Publish dữ liệu
    doc["temperature"] = temp; 
    doc["humidity"] = humi; 
    doc["bright"] = bright;

    String jsonData = JSON.stringify(doc);
    client.publish(topicSensor, jsonData.c_str()); 
    // String tempStr = "Temparature: " + String(temp) + " °C";
    // String humiStr = "Humidity: " + String(humi) + " %";
    // String brightStr = "Brightness: " + String(bright) + " Lux";
    // client.publish(topicTemp, tempStr.c_str());
    // client.publish(topicHumi, humiStr.c_str());
    // client.publish(topicBright, brightStr.c_str());
  }
}

void setup() {
  Serial.begin(115200);
  // Thiết lập DHT
  dht.begin();

  // Thiết lập chân đầu ra đèn
  pinMode(LED, OUTPUT);
  pinMode(FAN, OUTPUT);
  // Tắt đèn
  digitalWrite(LED, LOW);
  digitalWrite(FAN, LOW);

  setupWifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  publishSensor();

  delay(5000);
}
