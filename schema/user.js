const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    registration_no: {
        type: String,
        required: true,
        unique: true
    },
    Block_no: { // Ensure this is used consistently
        type: String,
        required: true
    },
    Room_no: { // Ensure this is used consistently
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiration: { type: Date }
}); // Add timestamps for createdAt and updatedAt

module.exports = userSchema;
