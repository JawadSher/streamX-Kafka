import { Kafka } from "kafkajs";
export const kafka = new Kafka({
    clientId: "streamX-consumer",
    brokers: ["192.168.10.6:9092"],
});
