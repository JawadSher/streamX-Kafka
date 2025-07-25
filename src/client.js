import { config } from "dotenv";
config({ path: "D:/streamX kafka/.env" });

import { Kafka } from "kafkajs";

const clientId = process.env.KAFKA_CLIENT_ID;
const broker1 = process.env.KAFKA_BROKER_1;
const userName = process.env.KAFKA_USER_NAME;
const password = process.env.KAFKA_USER_PASS;

export const kafka = new Kafka({
  clientId: `${clientId}`,
  // brokers: [""],
  brokers: [`${broker1}`],
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: `${userName}`,
    password: `${password}`,
  },
  connectionTimeout: 30000,
  authenticationTimeout: 10000,
  retry: {
    initialRetryTime: 300,
    retries: 5,
  },
});
