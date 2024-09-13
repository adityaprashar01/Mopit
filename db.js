const mongoose = require("mongoose");
require('dotenv').config();


if (!process.env.MONGO_URL) {
    console.error("MONGO_URL environment variable is not defined.");
    process.exit(1);
}

const mongoUrl = process.env.MONGO_URL;

const MoopitDB = mongoose.createConnection(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

MoopitDB.on('connected', () => {
    console.log("MoopitDB database connected");
});

MoopitDB.on('error', (error) => {
    console.error("Error in MoopitDB database connection: ", error);
});

MoopitDB.on('disconnected', () => {
    console.log("MoopitDB database is disconnected");
});

module.exports = { MoopitDB };
