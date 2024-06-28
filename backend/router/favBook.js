const express = require('express').Router();
const mongoose=require('mongoose')
const { generateToken, jwtAuthMiddleware } = require("../jwt");
const { BookStoreDB } = require('../db');
const bookSchema = require("../schema/book")
const book = BookStoreDB.model('book', bookSchema);
const userSchema = require('../schema/user');
const router = require('./book');
const user = BookStoreDB.model('user', userSchema);

router.put('/favBook', jwtAuthMiddleware, async (req, res) => {
    try {
        // Fetching id and Bookid from headers
        const { id, bookid } = req.headers;

        // Find the user by ID
        const findUser = await user.findById(id);
        if (!findUser) {
            return res.status(400).json({ message: "no user found" });
        }
      

        // Find the book by ID
        const findBook = await book.findById(bookid);
        if (!findBook) {
            return res.status(400).json({ message: "no book founded" });
        }

        // Check if the book is already in the user's favourites list
        const isBookfav = findUser.favourites.includes(bookid);
        if (isBookfav) {
            return res.status(400).json({ message: "book already added" });
        }

        // Add the book to the user's favourites list
        const newfav = await user.findByIdAndUpdate(id, { $push: { favourites: bookid } }, { new: true });
        return res.status(200).json({ message: "book added to favourites", newfav });
    } catch (err) { // Added err to catch block
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.put('/fav_delete', jwtAuthMiddleware, async (req, res) => {
    try {
        const { id, bookid } = req.headers;
        const User = await user.findById(id);
        const Book = await book.findById(bookid);
        if (!User) {
            return res.status(400).json({ message: "user not found" })
        }
        if (!Book) {
            return res.status(400).json({ message: "Book not found" })
        }
        const is_fav_book = User.favourites.includes(bookid);
        if (is_fav_book) {
            await user.findByIdAndUpdate(id, { $pull: { favourites: bookid } }, { new: true });
            return res.status(200).json({ message: "Book deleted successfully" });

        } else {
            return res.status(400).json({ message: "Book is not in the user's favouritess" });
        }

    } catch {
        return res.status(500).json({ message: "Internal server error" });

    }
})

router.get('/get-fav-book', jwtAuthMiddleware, async (req, res) => {
    try {
        const { id } = req.headers;
        const userWithFavourites = await user.findById(id).populate('favourites');
        if (!userWithFavourites) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ status: "ok", data: userWithFavourites.favourites });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;