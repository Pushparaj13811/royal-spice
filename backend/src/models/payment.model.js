import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        transactionId: {
            type: String,
            required: true,
        },
        orderId: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
    },
    { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
