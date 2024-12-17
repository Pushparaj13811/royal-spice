import mongoose, { Schema } from "mongoose";

const returnOrdersSchema = new Schema(
    {
        orderId: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        refundAmount: {
            type: Number,
            required: true,
        },
        refundStatus: {
            type: String,
            required: true,
        },
        comments: {
            type: String,
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
    },
    { timestamps: true }
);

export const ReturnOrders = mongoose.model("ReturnOrders", returnOrdersSchema);
