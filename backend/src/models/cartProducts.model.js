import mongoose, { Schema } from "mongoose";

const cartProductsSchema = new Schema(
    {
        cartId: {
            type: Schema.Types.ObjectId,
            ref: "cart",
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
    },
    { timestamps: true }
);

export const cartProduct = mongoose.model("cartProduct", cartProductsSchema);
