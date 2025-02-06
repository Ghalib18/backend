import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema=new Schema(
    {
     userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
     },
     email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
     },
     fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
     },
     avatar:{
        type:String, /*cloudnary*/
        required:true
     },
     coverImage:{
        type:String,  /*cloudnary*/
     },
     password:{
        type:String,
        required:[true,'password is req']
     },
     refreshToken:{
        type:String,
     },
     watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:Video
        }
     ]
     

    }
,{timestamps:true})

userSchema.pre("save",async function (next){
    if(!this.isModified("password"))return next();
    this.password=bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
   return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
    jwt.sign(
        {
           _id:this._id,
           email:this.email,
           userName:this.userName,
           fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECERT,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
   )
}
userSchema.methods.generateRefreshToken=function(){
    jwt.sign(
        {
           _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECERT,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
   )
}


export const User=mongoose.model("User",userSchema)