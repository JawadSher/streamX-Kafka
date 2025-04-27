import mongoose, { Schema, model } from "mongoose";
const mediaFileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User ID is required"],
        ref: "User",
        index: true,
    },
    fileURL: {
        type: String,
        required: [true, "File URL is required"],
        trim: true,
        validate: {
            validator: (v) => /^(http|https):\/\/[^ "]+$/.test(v),
            message: "Invalid URL format",
        },
    },
    cdnURL: {
        type: String,
        trim: true,
    },
    fileType: {
        type: String,
        enum: ["avatar", "videoThumbnail", "banner", "audio", "video"],
        default: "avatar",
    },
    mimeType: {
        type: String,
        enum: ["image", "video", "audio"],
        required: [true, "MIME type is required"],
    },
    fileSize: {
        type: Number,
        validate: {
            validator: (v) => v >= 0,
            message: "File size must be a positive number",
        },
    },
    storageProvider: {
        type: String,
        enum: ["local", "aws", "cloudinary", "imagekit", "google"],
        default: "local",
    },
    status: {
        type: String,
        enum: ["active", "deleted", "processing", "failed"],
        default: "active",
    },
}, { timestamps: true });
const MediaFile = mongoose.models?.MediaFile || model("MediaFile", mediaFileSchema);
export default MediaFile;
