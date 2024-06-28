const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    username: {
        type: [mongoose.Types.ObjectId],
        ref: "user"
    },
    book: {
        type:[mongoose.Types.ObjectId] ,
        ref: "book"
    },
    status: {
        type: String,
        enum: ["order placed", "out for delivery", "cancled", "deliverd"],
        default: "order placed"
    },


},
    { timestamps: true }
);

module.exports = mongoose.model("order",orderSchema);