const mongoose = require("mongoose");
require('dotenv').config();

// Ensure that the environment variable is defined
if (!process.env.MONGODB_URL) {
    console.error("MONGO_URL environment variable is not defined.");
    process.exit(1);
}

const mongoUrl = process.env.MONGODB_URL;

const BookStoreDB = mongoose.createConnection(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

BookStoreDB.on('connected', () => {
    console.log("BookStoreDB database connected");
});

BookStoreDB.on('error', (error) => {
    console.error("Error in BookStoreDB database connection: ", error);
});

BookStoreDB.on('disconnected', () => {
    console.log("BookStoreDB database is disconnected");
});

module.exports = { BookStoreDB };
