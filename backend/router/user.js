const express = require('express');
const router = express.Router(); // Use express.Router() to create a router instance
const userSchema = require('../schema/user'); // Assuming you have a User model defined
const {BookStoreDB}=require('../db');
const user = BookStoreDB.model('user', userSchema);
const bcrypt=require('bcrypt');
const bcryptjs=require('bcryptjs')
const  { generateToken, jwtAuthMiddleware }=require('../jwt')


router.post('/sign-up', async (req, res) => {
    try {
        const { email, password, username, address } = req.body;

        if (username.length < 4) {
            return res.status(400).json({ message: "Username must be greater than 3 characters" });
        }

        const existingUsername = await user.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const existingEmail = await user.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (password.length <= 5) {
            return res.status(400).json({ message: "Password must be greater than 5 characters" });
        }

        const hashPasswd=await bcrypt.hash(password,10);



        const newUser = new user({ email:email, username:username, password:hashPasswd, address:address });
        await newUser.save();


        return res.status(200).json("Signup successful");

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/sign-in',async(req,res)=>{
    
    try{
        const {email,password}=req.body;

        const existingUser=await user.findOne({email:email});
        if(!existingUser){
            return res.status(200).json({message:"Invalid credtinal "})
        }
        await bcryptjs.compare(password,existingUser.password,(err,data)=>{
            if(data){
                const payload = {
                    id: existingUser._id,
                    role:existingUser.role
                };
               const token = generateToken(payload);
                res.json({message:"login sucessfully",token,existingUser});
            }else
            res.status(200).json({message:"login not valid"})

        })       

    }catch(err){
        res.status(200).json({message:"Invalid"})

    }


})

router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
         const {id}=req.user;
         const data=await user.findById(id);
         return res.status(200).json(data);


    }catch{
  res.status(200).json({message:"Invalid"})

    }
})

router.put('/update-address',jwtAuthMiddleware,async(req,res)=>{
    try{
        const {id}=req.headers;
        const {address}=req.body;
        const findUser_data=await user.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"address updated",findUser_data});

    }catch(err){
        res.status(200).json({message:"falied to update address"})

    }
})
router.put('/update-email',jwtAuthMiddleware,async(req,res)=>{
    try{
        const {id}=req.headers;
        const {email}=req.body;
        const newEmail=await user.findByIdAndUpdate(id,{email:email});
        return res.status(200).json({message:"email updated",newEmail})

    }catch(err){
        res.status(200).json({message:"falied to update email"})
    }
   
})



module.exports = router;
