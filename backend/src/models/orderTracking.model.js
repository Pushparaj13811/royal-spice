import mongoose,{Schema} from "mongoose";


const orderTrackingSchema = new Schema({
    orderId:{
        type:Schema.Types.ObjectId,
        ref:"Order",
        required:true
    },
    status:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }
},{timestamps:true});

export const OrderTracking = mongoose.model("OrderTracking",orderTrackingSchema);