import mongoose, { Schema } from "mongoose";

const inventorySchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        transactionType: {
            type: String,
            required: true,
        },
        transationDate: {
            type: Date,
            required: true,
        },
        remakrs: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

export const Inventory = mongoose.model("Inventory", inventorySchema);
