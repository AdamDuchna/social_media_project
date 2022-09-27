const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');

router.post("/find", async(req,res) =>{
    try{ 
        const { username } = req.body;
        const user = await User.find({ username: username})
        .populate('friends requests following').exec();
        const posts = 
        await Post.find({owner: user})
        .populate('likes owner')
        .populate({ path:'comments', populate: { path:'owner'}} )
        .populate({ path:'comments', populate: { path:'comments', populate: "owner"}} )
        .exec();
        
        return res.status(201).json({user:user[0],posts:posts}) }
    catch (err){ return res.send(err); }
})

router.post("/image", async(req,res) =>{
    try{
        const { owner, picType, url} = req.body;
        const user = await User.findByIdAndUpdate( owner, { [picType]: url }).exec();
        const user2 = await User.findById(owner).populate('friends requests following').exec();
        const posts = 
        await Post.find({owner: user})
        .populate('likes owner')
        .populate({ path:'comments', populate: { path:'owner'}} )
        .populate({ path:'comments', populate: { path:'comments', populate: "owner"}} )
        .exec();
        return res.status(201).json({user:user2,posts:posts}) 
    }
    catch(err){ return res.send(err); }
})

router.post("/follow", async(req,res) => {
    try{
        const { user_id, profile_id} = req.body;
        console.log(user_id,profile_id)
        const user = await User.findByIdAndUpdate( user_id, {$push: { following: profile_id }}).exec();
        const result = await User.findById( user_id).populate('friends requests following').exec();
        return res.status(201).json(result)
    }
    catch (err){ return res.send(err)}
})

router.post("/unfollow", async(req,res) => {
    try{
        const { user_id, profile_id} = req.body;
        const user = await User.findById(user_id)
        const unfollowedList = user.following.filter( e => e.toString()  !== profile_id)
        console.log(unfollowedList);
        const unfollow= await User.findByIdAndUpdate( user_id, { following: unfollowedList} )
        const result = await User.findById( user_id).populate('friends requests following').exec();
        return res.status(201).json(result)
    }
    catch (err){ return res.send(err)}
})

router.post("/friend_request", async (req,res) => {
    try {
        const { user_id, profile_id} = req.body;
        const user = await User.findByIdAndUpdate(profile_id, {$push: {requests: user_id}})
        const result = await User.findById(profile_id).populate('friends requests following').exec();
        return res.status(201).json(result);
    }
    catch (err){ return res.send(err)}
})

router.post("/cancel_friend_request" , async (req,res)=>{
    try{
        const { user_id, profile_id} = req.body;
        const user = await User.findById(profile_id)
        const requestsList = user.requests.filter( e => e.toString() !== user_id)
        console.log(requestsList)
        const cancel_friend_request= await User.findByIdAndUpdate( profile_id, { requests: requestsList} );
        const result = await User.findById(profile_id).populate('friends requests following').exec();
        return res.status(201).json(result);
    }
    catch (err){ return res.send(err)}
})

module.exports = router;