import mongoose from "mongoose";
const { Schema, model, models } = mongoose.default;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        minLength: [2, "First name must be at least 2 characters"],
        maxLength: [50, "First name must be at most 50 characters"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        minLength: [2, "Last name must be at least 2 characters"],
        maxLength: [50, "Last name must be at most 50 characters"],
    },
    userName: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
        minLength: [2, "Username must be at least 2 characters"],
        maxLength: [60, "Username must be at most 60 characters"],
    },
    channelName: {
        type: String,
        required: [true, "Channel name is required"],
        trim: true,
        minLength: [2, "Channel name must be at least 2 characters"],
        maxLength: [60, "Channel name must be at most 60 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        maxLength: [70, "Email must be at most 70 characters"],
        match: [
            /^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid gmail address (e.g., username@gmail.com)",
        ],
    },
    password: {
        type: String,
    },
    country: {
        type: String,
        trim: true,
        default: "None",
    },
    phoneNumber: {
        type: String,
        trim: true,
        default: null,
        maxLength: [15, "Phone number must be at most 15 characters"],
        match: [/^0\d{10}$/, "Please enter a valid 11-digit phone number"],
    },
    bio: {
        type: String,
        trim: true,
        default: "Hay guys am new in the streamX community",
        maxLength: [500, "Bio must be at most 500 characters"],
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    verificationCode: {
        type: String,
        trim: true,
        default: null,
        minLength: [6, "Verification code must be at least 6 characters"],
        maxLength: [6, "Verification code must be at most 6 characters"],
    },
    accountStatus: {
        type: String,
        required: true,
        enum: ["active", "suspended", "deleted"],
        default: "active",
    },
    lastLogin: {
        type: Date,
        default: () => new Date(),
    },
    watchHistory: {
        type: [Schema.Types.ObjectId],
        ref: "Video",
        default: [],
    },
}, { timestamps: true });
const User = models?.User || model("User", userSchema);
export default User;
