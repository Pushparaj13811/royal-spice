import mongoose, {Schema} from "mongoose";

const reviewSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    }
}, {timestamps: true});

export const Review = mongoose.model("Review", reviewSchema);