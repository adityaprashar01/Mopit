const mongoose=require("mongoose")

const UserOTPVerificationSchema=new mongoose.Schema({
    UserID:String,
    otp:String,
    createdAt:Date,
    expireAt:Date
});
const UserOtpVerfication=mongoose.model(
    "UserOTPVerification",
    "UserOTPVerificationSchema"
);
module.exports=UserOtpVerfication;