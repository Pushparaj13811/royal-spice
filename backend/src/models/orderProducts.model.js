import mongoose, { Schema } from "mongoose";

const orderProductsSchema = new Schema(
    {
        orderId: {
            type: Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export const OrderProducts = mongoose.model(
    "OrderProducts",
    orderProductsSchema
);
