const router = require("express").Router();
const bookSchema = require('../schema/book');
const { BookStoreDB } = require('../db');
const book = BookStoreDB.model('book', bookSchema);
const { generateToken, jwtAuthMiddleware } = require('../jwt');
const userSchema = require('../schema/user');
const user = BookStoreDB.model('user', userSchema);



router.post('/add', jwtAuthMiddleware, async (req, res) => {
    try {
        const { id } = req.headers;
        const User = await user.findById(id);
        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }
        if (User.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }
        const { price, url, author, title, language, desc } = req.body;

        const existingTitle = await book.findOne({ title: title });
        if (existingTitle) {
            return res.status(200).json({ message: "Book already exists" });
        }

        const newBook = new book({
            url: url,
            title: title,
            author: author,
            desc: desc,
            price: price,
            language: language
        });
        await newBook.save();
        return res.status(201).json({ message: "Book added", newBook });
    } catch (err) {
        console.error(err);
        return res.status(502).json({ message: "Internal server error" });
    }
});

router.put('/update', jwtAuthMiddleware, async (req, res) => {
    try {
        const { id } = req.headers;
        const User = await user.findById(id);
        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }
        if (User.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        const { bookid } = req.headers;
        const { author, url, price, title } = req.body;
        const updateData = { author, url, price, title };

        const updateBook = await book.findByIdAndUpdate(bookid, updateData );
        if (!updateBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({ message: "Book updated successfully", updateBook });
    } catch (err) {
        console.error(err);
        return res.status(503).json({ message: "Internal server error" });
    }
});

router.delete('/delete',jwtAuthMiddleware,async(req,res)=>{
    try{
        const {id}=req.headers;
        const finduser=await user.findById(id);
        if(finduser.role!=="admin"){
            return res.status(404).json({message:"not authorised to delete"})
        }
        const {bookid}=req.headers;
        const deleteBook=await book.findByIdAndDelete(bookid);
        return res.status(402).json({message:"book deleted"})

    }catch{
        console.error(err);
        return res.status(504).json({ message: "Internal server error" });
    }
})
router.get('/recent-4',jwtAuthMiddleware,async(req,res)=>{
    try{
        const getTop4=await book.find().limit(4);
        return res.status(200).json({getTop4});

    }catch{
        console.error(err);
        return res.status(505).json({ message: "Internal server error" });
    }
})
router.get('/bookid/:id',jwtAuthMiddleware,async(req,res)=>{
    try{
        const {id}=req.params;
        const bookId=await book.findById(id);
        return res.status(200).json({bookId});

    }catch(err){
        console.error(err);
        return res.status(506).json({ message: "Internal server error" });
    }
})


module.exports = router;
