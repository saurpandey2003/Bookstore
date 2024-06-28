const express = require("express");
const router = express.Router();
const mongoose = require('mongoose'); // Ensure mongoose is imported
const bookSchema = require('../schema/book');
const { BookStoreDB } = require('../db');
const { generateToken, jwtAuthMiddleware } = require('../jwt');
const userSchema = require('../schema/user');

const book = BookStoreDB.model('book', bookSchema);
const user = BookStoreDB.model('user', userSchema);

router.post('/place', jwtAuthMiddleware, async (req, res) => {
    try {
        const { id, bookid } = req.headers;

        const User = await user.findById(id);
        const Book = await book.findById(bookid);

        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!Book) {
            return res.status(400).json({ message: "Book not found" });
        }


        const isPlacedOrder = User.orders.includes(bookid);
        if (isPlacedOrder) {
            return res.status(200).json({ message: "Order has already been placed" });
        }

        await user.findByIdAndUpdate(id, { $push: { orders: bookid } }, { new: true });
        return res.status(200).json({ message: "Book added to orders" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put('/remove-order', jwtAuthMiddleware, async (req, res) => {
    try {
        const { id, bookid } = req.headers;


        const User = await user.findById(id);
        const Book = await book.findById(bookid);

        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!Book) {
            return res.status(400).json({ message: "Book not found" });
        }

        const isOrderExists = User.orders.includes(bookid);
        if (isOrderExists) {
            await user.findByIdAndUpdate(id, { $pull: { orders: bookid } }, { new: true });
            return res.status(200).json({ message: "Book has been removed from orders" });
        } else {
            return res.status(200).json({ message: "Book is not in the orders" });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/get-order',jwtAuthMiddleware,async(req,res)=>{
    try{
        const { id, bookid } = req.headers;


        const User = await user.findById(id);

        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }

        const order_details=await user.findById(id).populate("orders")
        return res.status(200).json({status:"ok",data:order_details.orders})

    }catch(err){
        console.log(err);                   
        return res.status(500).json({ message: "Internal server error" });
    }
})



module.exports = router;
