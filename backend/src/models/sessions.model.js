import mongoose, { Schema } from "mongoose";

const SessionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        refreshToken: {
            type: String,
            required: true,
        },
        deviceInfo: {
            type: String,
            required: true,
        },
        userAgent: {
            type: String,
            required: true,
        },
        ipAddress: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);


export const Session = mongoose.model("Session", SessionSchema);
