import{asyncHandler}from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiRes.js"
import{User} from "../models/user.models.js"
import{uploadOnCloudinary} from "../utils/cloudinary.js"
const registerUser=asyncHandler(async(req,res)=>{
// 1. get user from frontend: done
// 2. validation- not empty: done
// 3. check if the user already exits: done
// 4. check for image and check for avatar: done
// 5.upload them to the cloudinary and check for avatar:done
// 6.create  user object and entry in the db:
// 7. remove password and refreshtokens
// 8. check for the user created
// return res

const {fullName,userName,email,password}=req.body
if([fullName,userName,email,password].some((field)=>field.trim()==="")){
    throw new ApiError(400,"all fields are required");
}
 const existedUser= await User.findOne({$or:[{userName},{email}]});
//  if the user exits with the given username or email then existeduser have that user data in the form of object and if not then it will be null
if(existedUser) throw new ApiError(409,"User with the given email or username already exits")
const avatarLocalPath=req.files?.avatar[0]?.path;
// const coverImageLocalPath=req.files?.coverImage[0]?.path;
// console.log(req.files);
let coverImageLocalPath;
if(req.files&&Array.isArray(req.files.coverImage)&&req.files.coverImage.length>0){
    coverImageLocalPath=req.files?.coverImage[0]?.path;
}
if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
}
 const avatar = await uploadOnCloudinary(avatarLocalPath);
 const coverImage = await uploadOnCloudinary(coverImageLocalPath);
if(!avatar){
    throw new ApiError(400,"Avatar file is required")
}
 const user= await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url||"",
    email,
    password,
    userName:userName.toLowerCase()
 })
  const createdUser=await User.findById(user._id).select(
    "-password -refreshtokens"
  )
  if(!createdUser){
    throw new ApiError(500,"something went wrong while registerting the user")
}
return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
)

})
export {registerUser};