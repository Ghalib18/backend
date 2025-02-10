import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import {User} from "./user.models.js"
const videoSchema=new Schema(
    {
     videoFile:{
        type:String,/*cloudnary url*/
        required:true
     },
     thumbnail:{
        type:String,/*cloudnary url*/
        required:true
     },
     owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
     },
     title:{
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true
     },
     duration:{
        type:Number, /*cloudnary url*/
        required:true
     },
     veiw:{
        type:Number,
        default:0
     },
     isPublished:{
        type:Boolean,
        default:true
     },

    }
,{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video=mongoose.model("Video",videoSchema);