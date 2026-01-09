const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


router.post('/register',async (req,res)=>{

    try{
        const existingUser = await User.findOne({
            $or: [{email: req.body.email},{username: req.body.username}]
        });

        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const {password, ...userWithoutPassword} = user._doc;
        res.status(200).json(userWithoutPassword);
    }
    catch(err){
        res.status(500).json(err);
    }
});

router.post('/login',async (req,res)=>{
    try{

        const user  = await User.findOne({email: req.body.email});

        if(!user){
            return res.status(400).json({ message: "User not found" });
        }

        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({

            id: user._id,
            isAdmin: user.isAdmin
        },process.env.JWT_SECRET,{
            expiresIn: "1h"
        });

        const {password, ...userWithoutPassword} = user._doc;
        res.status(200).json({ ...userWithoutPassword, token });
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
