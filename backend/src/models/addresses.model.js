import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        addressType: {
            type: String, 
            required: true,
        }, 
        addressLine1: {
            type: String,
            required: true,
        },
        addressLine2:{
            type: String,
            required: false,
        }, 
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        isDefault: {
            type: Boolean,
            required: true,
            default: true,
        }
    },
    { timestamps: true }
);

export const Address = mongoose.model("Address", addressSchema);
