const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const { MoopitDB } = require("../db");
const userSchema = require('../schema/user');
const User = MoopitDB.model('User', userSchema);

// Generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP to user's email
const sendOTPEmail = async (email) => {
  try {
    // Generate OTP
    const otp = generateOTP();

    // Set up nodemailer transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your Room Cleaning App OTP',
      text: `Your OTP for login is ${otp}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Save OTP and expiration time in the database
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Update the user in the database
    // const updateResult = await User.updateOne(
    //   { email: email },
    //   { otp: otp, otpExpiration: expirationTime }
    // );

    // // Check if the user was found and updated
    // if (updateResult.modifiedCount === 0) {
    //   console.log(`No user found with email: ${email}. OTP not saved.`);
    //   return { success: false, message: 'User not found' };
    // }

    console.log(`OTP sent to ${email} successfully.`);
    return { success: true, otp }; // Return OTP for testing purposes (optional)
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, error };
  }
};

module.exports = sendOTPEmail;
