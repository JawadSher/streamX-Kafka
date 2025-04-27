import { config } from "dotenv";
config({ path: "D:/streamX kafka/.env" });

import { kafka } from "./client.js";
import { connectDB } from "./database.js";
import UserModel from "../models/user.model.js";
import MediaFileModel from "../models/mediaFile.model.js";
import { connectRedis } from "./functions/connectRedis.js";

async function runConsumer() {
  await connectDB();
  console.log("MongoDB connected to database:", process.env.MONGO_DB_NAME);

  const redis = await connectRedis();
  console.log("Redis client connected successfully");

  const consumer = kafka.consumer({ groupId: "streamX-processor" });
  await consumer.connect();
  await consumer.subscribe({
    topics: ["sign-up", "user-update"],
    fromBeginning: false,
  });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) return;
      const data = JSON.parse(message.value.toString());

      try {
        if (topic === "sign-up") {
          const newUser = new UserModel({
            firstName: data.firstName,
            lastName: data.lastName,
            userName: data.userName,
            channelName: data.channelName,
            email: data.email,
            password: data.password,
            bio: data.bio,
            isVerified: data.isVerified,
          });
          const savedUser = await newUser.save();

          if (data.avatar) {
            await MediaFileModel.create({
              userId: savedUser._id,
              fileURL: data.avatar,
              fileType: "avatar",
              mimeType: "image",
              storageProvider: data.storageProvider,
              status: "active",
            });
          }

          console.log(`Inserted user ${savedUser._id}`);

        } else if (topic === "user-update") {
          const { userId, firstName, lastName, country, phoneNumber } = data;
          if (!userId) {
            console.error("User ID missing in update data");
            throw new Error("userId required");
          }

          const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { firstName, lastName, country, phoneNumber },
            { new: true, runValidators: true }
          );

          if (!updatedUser) {
            console.error(`User ${userId} not found in MongoDB`);
            throw new Error("user not found");
          }

          await redis.hset(`app:user:${userId}`, {
            firstName,
            lastName,
            country,
            phoneNumber
          });

          console.log(`Updated user ${userId} in Mongo & Redis`);
        }

        await consumer.commitOffsets([
          { topic, partition, offset: (Number(message.offset) + 1).toString() }
        ]);

      } catch (err) {
        console.error(`Error processing ${topic} @ offset ${message.offset}:`, err);
      }
    }
  });
}

runConsumer().catch(err => {
  console.error("Fatal consumer error:", err);
  process.exit(1);
});
