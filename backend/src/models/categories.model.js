import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
