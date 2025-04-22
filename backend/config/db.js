const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const connectToDB = async (url) => {
    try {
        await mongoose.connect(url, {
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log("MongoDB connection failed: ", error.message);
    }
}

module.exports = { connectToDB };