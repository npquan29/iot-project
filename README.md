# PROJECT IOT-2024

Project được thực hiện với các nền tảng NodeJS - ExpressJS, MySQL Workbench 8.0 CE, MQTT Broker, Arduino IDE, NextJS14 cùng các thư viện khác.

## Cài đặt project

Tiến hành clone project bằng câu lệnh git clone trong terminal. Sau đó, thực hiện các câu lệnh sau trong terminal của Visual Studio Code:
1. Vào thư mục server, sau đó cài đặt các thư viện của npm
```bash
npm install
```
2. Vào thư mục iot-app, sau đó cài đặt các thư viện của npm
```bash
npm install
```

## Arduino
1. [Cài đặt Arduino](https://www.arduino.cc/en/software)
2. [Arduino Configuration](https://cedalo.com/blog/how-to-install-mosquitto-mqtt-broker-on-windows/)
3. [Bật tắt đèn](https://www.emqx.com/en/blog/esp8266_mqtt_led)
4. [Pub Sub dữ liệu bằng MQTT](https://randomnerdtutorials.com/esp32-mqtt-publish-subscribe-arduino-ide/)
5. [DHT11 với ESP32](https://randomnerdtutorials.com/esp32-dht11-dht22-temperature-humidity-sensor-arduino-ide/)
6. [Light Sensor Module với ESP32](https://esp32io.com/tutorials/esp32-ldr-module)
7. Thay đổi các giá trị sau trong file "reconnectIOT.ino" ở folder arduino cho phù hợp với Wifi và MQTT Broker:
```
const char *ssid = "<YOUR_WIFI_SSID>";
const char *password = "<YOUR WIFI PASSWORD>";
const char *mqtt_server= "<YOUR HOST>";
const int mqtt_port = <YOUR MQTT PORT NUMBER>;
const char *mqtt_username = "<YOUR MQTT USERNAME>";
const char *mqtt_password = "<YOUR MQTT PASSWORD>";
```

## Database trong MySQL
- Tạo database với tên "iot", sau đó tạo 2 bảng: sensor(id, temperature, humidity, light, time) và action(id, device, status, time).
- Kết nối MySQL với server trong file db.js trong folder server:
```
export const db = await mysql.createConnection({
    host: "<your host>",
    user: "<your user>",
    password: "<your password>",
    database: 'iot'
});     
```

## MQTT trong Server
- Kết nối với MQTT Broker:
```
const host = 'localhost';
const port = 1886;
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${port}`;

export const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: "<your mqtt username>",
    password: "<your mqtt password>",
    reconnectPeriod: 1000
});
```

## Khởi chạy Front-end
- Mở folder iot-app trong terminal và chạy câu lệnh: 
```
npm run dev
```
- Giao diện Dashboard:
![Dashboard](https://scontent.fhan5-9.fna.fbcdn.net/v/t1.15752-9/433589022_2375425969308550_7543537801723997195_n.png?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Z2rYHTLfXpYAX91CeWf&_nc_ht=scontent.fhan5-9.fna&oh=03_AdQSdsgK0hFui3UMGSqefEHTvOKEdRTiAjxYvrLiIHOkXg&oe=662C66D5)
- Giao diện Data Sensor:
![Data Sensor](https://scontent.fhan5-6.fna.fbcdn.net/v/t1.15752-9/433454559_392692973623672_6980974951250184786_n.png?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=6WzAOgu5wiUAX-up7X1&_nc_ht=scontent.fhan5-6.fna&oh=03_AdSaWauNhHOLF5AwGGt9SV7ApJhlfoOffmwzx9KM3lnK3Q&oe=662C4684)
- Giao diện Action History:
![Action History](https://scontent.fhan5-2.fna.fbcdn.net/v/t1.15752-9/433622561_1143770213299948_8275038978554833592_n.png?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=XTZXrRrv6jEAX8a9lmJ&_nc_ht=scontent.fhan5-2.fna&oh=03_AdSPbscKYsRWr9IhEXgbIiMy9oBkTvIXfLLoz9-gPyo7sQ&oe=662C6F14)

## Khởi chạy Back-end
- Mở folder server trong terminal và chạy câu lệnh:
```
npm run server
```
- Hiển thị trong terminal:
![Server](https://scontent.fhan5-10.fna.fbcdn.net/v/t1.15752-9/433830415_938879457565667_6407393871437822140_n.png?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=MOHXe9MxUy0AX91gRLu&_nc_ht=scontent.fhan5-10.fna&oh=03_AdQyqvG0j_A0SuzCabiLIWPmKa88_IreWCGhkq4F6Yr_FQ&oe=662C55B0)

## API Documentations
[API Docs](https://documenter.getpostman.com/view/29359206/2sA2xpRogP)