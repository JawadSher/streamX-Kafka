import { connectRedis } from "./connectRedis.js";
const parseJSON = (str, fallback) => {
    try {
        return str ? JSON.parse(str) : fallback;
    }
    catch {
        return fallback;
    }
};
export async function getUserFromRedis(userId) {
    if (!userId)
        return null;
    try {
        const redis = await connectRedis();
        const userData = await redis.hgetall(`app:user:${userId}`);
        if (!userData || Object.keys(userData).length === 0)
            return null;
        const user = {
            _id: userData._id,
            userName: userData.userName,
            watchHistory: parseJSON(userData.watchHistory, []),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            accountStatus: userData.accountStatus,
            bannerURL: userData.banner,
            avatarURL: userData.avatar,
            channelName: userData.channelName,
            isVerified: ["true", "1", true].includes(userData.isVerified),
            bio: userData.bio,
            country: userData.country,
            phoneNumber: userData.phoneNumber,
        };
        return user;
    }
    catch (error) {
        console.error("Redis fetch error:", error);
        return null;
    }
}
