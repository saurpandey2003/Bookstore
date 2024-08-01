const router = require("express").Router();
const bookSchema = require('../schema/book');
const { BookStoreDB } = require('../db');
const book = BookStoreDB.model('book', bookSchema);
const { generateToken, jwtAuthMiddleware } = require('../jwt');
const userSchema = require('../schema/user');
const user = BookStoreDB.model('user', userSchema);

router.post('/add-to-cart', jwtAuthMiddleware, async (req, res) => {
    try {
        const {id} = req.user; 
        const { bookid } = req.headers;
        const User = await user.findById(id);
        const Book = await book.findById(bookid)
        if (!User) {
            return res.status(200).json({ message: "no user found" })

        }
        if (!Book) {
            return res.status(200).json({ message: "no book found" })

        }

        const is_book_cart = User.cart.includes(bookid);
        if (is_book_cart) {
            return res.status(200).json({ message: "Book already addeded to cart" })
        }
        await user.findByIdAndUpdate(id, { $push: { cart: bookid } }, { new: true });
        return res.status(200).json({ message: "Book added to cart successfully" });

    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "internal server error" })

    }
})

router.put("/delete", jwtAuthMiddleware, async (req, res) => {
    try {
        const {id} = req.user; 
        const { bookid } = req.headers;
        const User = await user.findById(id);
        const Book = await book.findById(bookid)
        if (!User) {
            return res.status(200).json({ message: "no user found" })

        }
        if (!Book) {
            return res.status(200).json({ message: "no book found" })

        }
        const is_book_cart = User.cart.includes(bookid);
        if (is_book_cart) {
            await user.findByIdAndUpdate(id, { $pull: { cart: bookid } }, { new: true });
            return res.status(200).json({ message: "Book has been removed from cart" });
        } else {
            return res.status(400).json({ message: "Book is already removed from cart" });

        }

    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "internal server error" })

    }
})
router.get('/get-cart-book', jwtAuthMiddleware, async (req, res) => {
    try {
        const { id } = req.user;
        const User = await user.findById(id).populate('cart');
        const cart_data = User.cart;
        return res.status(200).json({ status: "ok", data: cart_data })

    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

module.exports = router