const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');

router.post("/find", async(req,res) =>{
    try{ 
        console.log(req.body)
        const { username } = req.body;
        const user = await User.find({ username: username});
        const posts = await Post.find({owner: user}).populate('likes owner').populate({ path:'comments', populate: { path:'owner'}} ).exec();
        return res.status(201).json({user:user[0],posts:posts}) }
    catch (err){ return res.send(err); }
})

router.post("/image", async(req,res) =>{
    try{
        const { owner, picType, url} = req.body;
        const user = await User.findByIdAndUpdate( owner, { [picType]: url }).exec();
        const user2 = await User.findById(owner)
        const posts = await Post.find({owner: user}).populate('likes owner').populate({ path:'comments', populate: { path:'owner'}} ).exec();
        return res.status(201).json({user:user2,posts:posts}) 
    }
    catch(err){ return res.send(err); }
})

module.exports = router;