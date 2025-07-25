import { config } from "dotenv";
config({ path: "D:/streamX kafka/.env" });

import { kafka } from "./client.js";
import { connectDB } from "./database.js";
import UserModel from "../models/user.model.js";
import MediaFileModel from "../models/mediaFile.model.js";
import { connectRedis } from "./functions/connectRedis.js";
import {
  SendAccountDeletionMessage,
  SendBasicCredentialsUpdateMessage,
  SendPasswordUpdateMessage,
  SendSignInAlertMessage,
  SendWelcomeMessageToUnverifiedUser,
  SendWelcomeMessageToVerifiedUser,
} from "./resend.js";

async function runConsumer() {
  await connectDB();
  console.log("MongoDB connected to database:", process.env.MONGO_DB_NAME);

  const redis = await connectRedis();
  console.log("Redis client connected successfully");

  const consumer = kafka.consumer({ groupId: "streamX-processor" });
  await consumer.connect();
  await consumer.subscribe({
    topics: [
      "sign-up-message",
      "user-update-message",
      "user-assets-update",
      "user-passwd-change-message",
      "user-account-deletion-and-message",
      "user-email-verification-and-message",
      "user-sign-in-alert-message",
    ],
    fromBeginning: true,
  });

  await consumer.run({
    autoCommit: true,
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) return;
      const data = JSON.parse(message.value.toString());

      try {
        if (topic === "sign-up-message") {
          console.log(
            "-------------> Sign-up Topic in action <---------------"
          );
          console.log(data);

          if (data.isVerified) {
            await SendWelcomeMessageToVerifiedUser({
              firstName: data.firstName,
              userEmail: data.userEmail,
            });
            console.log(
              `Welcome message sended to verified user ${data.userEmail}`
            );
          } else {
            await SendWelcomeMessageToUnverifiedUser({
              firstName: data.firstName,
              userEmail: data.userEmail,
            });
            console.log(
              `Welcome message sended to un-verified user ${data.userEmail}`
            );
          }
        } else if (topic === "user-update-message") {
          console.log(
            "-------------> User Update topic in action <---------------"
          );
          console.log(data);

          await SendBasicCredentialsUpdateMessage({
            firstName: data.firstName,
            userEmail: data.userEmail,
            updatedFields: [...data.updatedFields],
          });

          // const { userId, firstName, lastName, country, phoneNumber } = data;
          // if (!userId) {
          //   console.error("User ID missing in update data");
          //   throw new Error("userId required");
          // }

          // const updatedUser = await UserModel.findByIdAndUpdate(
          //   userId,
          //   { firstName, lastName, country, phoneNumber },
          //   { new: true, runValidators: true }
          // );

          // if (!updatedUser) {
          //   console.error(`User ${userId} not found in MongoDB`);
          //   throw new Error("user not found");
          // }

          // await redis.hset(`app:user:${userId}`, {
          //   firstName,
          //   lastName,
          //   country,
          //   phoneNumber
          // });

          console.log(`Updated user ${userEmail} in Mongo & Redis`);
        } else if (topic === "user-assets-update") {
          console.log(
            "-------------> User Assets topic in action <---------------"
          );
          console.log(data);

          const {
            userId,
            assetType,
            assetMemeType,
            assetURL,
            assetSize,
            assetProvider,
            assetStatus,
          } = data;
          await MediaFileModel.findOneAndUpdate(
            {
              userId: new mongoose.Types.ObjectId(userId),
            },
            {
              $set: {
                fileURL: assetURL,
                mimeType: assetMemeType,
                fileSize: assetSize,
                storageProvider: assetProvider,
                status: assetStatus,
                fileType: assetType,
              },
            }
          );

          if (assetType === "banner" && assetMemeType === "image") {
            await redis.hset(`app:user:${userId}`, {
              banner: assetURL,
            });
          } else if (assetType === "avatar" && assetMemeType === "image") {
            await redis.hset(`app:user:${userId}`, {
              avatar: assetURL,
            });
          }

          console.log(`User Asset ${userId} is updated in Mongo & Redis`);
        } else if (topic === "user-passwd-change-message") {
          console.log(
            "-------------> Password change topic in action <---------------"
          );
          console.log(data);

          await SendPasswordUpdateMessage({
            firstName: data.firstName,
            userEmail: data.userEmail,
          });

          // const {userId, password} = data;

          // await UserModel.findByIdAndUpdate( data.userId,
          //   { password },
          // );

          console.log(`User ${userEmail} password changed successfully`);
        } else if (topic === "user-account-deletion-and-message") {
          console.log(
            "-------------> Account deletion topic in action <---------------"
          );
          console.log(data);

          const userId = data;
          if (!userId) {
            console.error("User ID missing in update data");
            throw new Error("userId required");
          }

          await UserModel.findByIdAndUpdate(
            userId,
            {
              accountStatus: "deleted",
            },
            { new: true, runValidators: true }
          );

          await SendAccountDeletionMessage({
            firstName: data.firstName,
            userEmail: data.email,
          });

          console.log(`User ${userEmail} Account Delete from Mongo & Redis`);
        } else if (topic === "user-email-verification-and-message") {
          console.log(
            "-------------> Email verification topic in action <---------------"
          );
          console.log(data);

          const { email, OTP, expiryTime, firstName } = data;

          await SendVerificationCode({
            firstName: firstName,
            userEmail: email,
            OTP: OTP,
            expiryTime: expiryTime,
          });

          console.log(`Email verification code sent to ${email}`);
        } else if (topic === "user-sign-in-alert-message") {
          console.log(
            "-------------> Sign-in Alert topic in action <---------------"
          );
          console.log(data);

          await SendSignInAlertMessage({
            firstName: data.firstName,
            userEmail: data.email,
            time: data.time,
            location: data.location,
            device: data.device,
          });

          console.log(`User sign-in alert message send to ${userEmail}`)
        }

        await consumer.commitOffsets([
          { topic, partition, offset: (Number(message.offset) + 1).toString() },
        ]);
      } catch (err) {
        console.error(
          `Error processing ${topic} @ offset ${message.offset}:`,
          err
        );
      }
    },
  });
}

runConsumer().catch((err) => {
  console.error("Fatal consumer error:", err);
  process.exit(1);
});
