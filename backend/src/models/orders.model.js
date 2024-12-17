import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
    {
        shippingAddressId: {
            type: Schema.Types.ObjectId,
            ref: "Address",
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
