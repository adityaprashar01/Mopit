const express = require('express');
const router = express.Router();
const userSchema = require('../schema/user');
const { MoopitDB } = require("../db");
const User = MoopitDB.model('User', userSchema);
const bcrypt = require("bcrypt");
const { generateToken } = require('../jwt');
const sendOTPEmail = require('../model/userOtp');

// Function to generate a random OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// VIT email validation
const isValidVITEmail = (email) => {
    const vitEmailPattern = /^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$/;
    return vitEmailPattern.test(email);
};

// Signup route - no OTP verification, just email validation
router.post('/signup', async (req, res) => {
    try {
        const { username, Room_no, Block_no, email, registration_no, password } = req.body;

        if (!username || !Room_no || !Block_no || !email || !registration_no || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (!isValidVITEmail(email)) {
            return res.status(400).json({ message: 'Please use your VIT college email ending with @vitstudent.ac.in.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' });
        }

        const hashpswd = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            Room_no, 
            Block_no, 
            email,
            registration_no,
            password: hashpswd,
            isVerified: true
        });

        await newUser.save();
        res.status(201).json({ message: 'User signup successful', user: newUser });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Server error during signup.', error: err.message });
    }
});

// Step 1: Request OTP - User provides email, OTP is sent
// Step 1: Request OTP - User provides email, OTP is sent
// Step 1: Request OTP - User provides email, OTP is sent
// Step 1: Request OTP - User provides email, OTP is sent
router.post('/request-otp', async (req, res) => {
    try {
        const { email } = req.body;

        // Ensure the email belongs to a VIT student
        if (!isValidVITEmail(email)) {
            return res.status(400).json({ message: 'Only VIT student emails are allowed for login.' });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "Email does not exist" });
        }

        // Generate a new OTP
        const otp = generateOTP();

        // Set OTP expiration time (1 minute from now)
        const otpExpiration = new Date(Date.now() + 1 * 60 * 1000); // 1 minute

        // Store OTP and expiration time in the database
        existingUser.otp = otp;
        existingUser.otpExpiration = otpExpiration;
        
        // Save the user with the new OTP
        await existingUser.save();

        // Log for debugging
        console.log(`Generated OTP: ${otp} for email: ${email}`);

        // Send OTP email
        const otpResult = await sendOTPEmail(email, otp);
        if (!otpResult.success) {
            return res.status(500).json({ message: 'Error sending OTP' });
        }

        // Respond with success message
        res.status(200).json({ message: 'OTP sent to your email.', otp: otp });

    } catch (err) {
        console.error('Error requesting OTP:', err);
        res.status(500).json({ message: 'Server error during OTP request.', error: err.message });
    }
});


// Step 2: Verify OTP and log in the user
router.post('/login-with-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!isValidVITEmail(email)) {
            return res.status(400).json({ message: 'Only VIT student emails are allowed for login.' });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "Email does not exist" });
        }

        console.log(`OTP from request: ${otp}, Stored OTP: ${existingUser.otp}, Expiration: ${existingUser.otpExpiration}`);

        // Check if OTP matches and is not expired (within 1 minute)
        if (existingUser.otp === otp && existingUser.otpExpiration > new Date()) {
            const payload = {
                id: existingUser._id,
                role: existingUser.role
            };

            const token = generateToken(payload);

            // Clear OTP and expiration after successful login
            existingUser.otp = undefined;
            existingUser.otpExpiration = undefined;
            await existingUser.save();

            console.log('Login successful');
            res.json({ message: "Login successful", token, user: existingUser });
        } else {
            console.log('Invalid or expired OTP');
            res.status(400).json({ message: "Invalid or expired OTP." });
        }
    } catch (err) {
        console.error('Login with OTP error:', err);
        res.status(500).json({ message: "Server error during OTP login.", error: err.message });
    }
});
module.exports = router;
