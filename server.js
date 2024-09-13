const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config(); 
const user=require("./model/user")

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.use("/user",user)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
