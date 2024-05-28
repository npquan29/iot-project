import mqtt from "mqtt";
import { insertSensorData } from "./sensorDataController.js";

const host = 'localhost';
const port = 1886;
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${port}`;

const topicSensor = 'sensor';
const topicConfirmLed = 'confirm/led';
const topicConfirmFan = 'confirm/fan';
const topicConfirmDoor = 'confirm/door';

export const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'quan',
    password: '123',
    reconnectPeriod: 1000
});

export const connectMQTT = () => {
    client.on('connect', () => {
        console.log('MQTT connected');
        client.subscribe([topicConfirmLed, topicConfirmFan, topicSensor, topicConfirmDoor]); // Add Device
        // client.subscribe([topicConfirmLed, topicConfirmFan, topicSensor]); // Show Case 1
        console.log("SUB OK");
    });

    // client.on('message', async (topic, payload) => {
    //     if(topic === topicSensor) {
    //         const data = JSON.parse(payload.toString());
    //         await insertSensorData(data);

    //         console.log("OKE");
    //     }
    // })
};
