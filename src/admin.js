import { kafka } from "./client.js";
async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting ....");
  await admin.connect();
  console.log("Admin connected successfully ....");
  const existingTopics = await admin.listTopics();
  const topicsToCreate = [
    "sign-up-message",
    "user-update-message",
    "user-assets-update",
    "user-passwd-change-message",
    "user-account-deletion-and-message",
    "user-email-verification-and-message",
    "user-sign-in-alert-message",
  ].filter((topic) => !existingTopics.includes(topic));
  if (topicsToCreate.length > 0) {
    await admin.createTopics({
      topics: topicsToCreate.map((topic) => ({
        topic,
        numPartitions: 1,
        replicationFactor: 1,
      })),
    });
    console.log(`Created topics: ${topicsToCreate.join(", ")}`);
  } else {
    console.log("All topics already exist.");
  }
  await admin.disconnect();
}
init().catch(console.error);
