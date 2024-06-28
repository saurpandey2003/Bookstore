const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/128/3177/3177440.png'
    },
    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"]
    },
    favourites: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'book',
        default: []
    },
    cart: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'book',
        default: []
    },
    orders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'book',
        default: []
    }
});


module.exports = userSchema