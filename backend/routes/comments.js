const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

router.post("/reply", async(req,res)=>{
    try{
        const { post_id, user_id, comment_id, comment} = req.body;
        const result = await Comment.create({ owner: user_id ,text: comment , creationDate: new Date()})
        const result2 = await Comment.findByIdAndUpdate( comment_id, {$push: {comments: result._id }}).exec();
        const post2 = 
        await Post.findById(post_id)
        .populate('likes owner')
        .populate({ path:'comments', populate: { path:'owner'}} )
        .populate({ path:'comments', populate: { path:'comments', populate: "owner"}} )
        .exec();
        return res.status(201).json(post2);
    }
    catch(err){ return res.send(err);}
})

router.post("/like", async(req,res)=>{
    try{
        const { post_id, user_id, comment_id} = req.body;
        const comment = await Comment.findById(comment_id)
        const result = comment.likes.find( e => e.toString() === user_id );

        if(result){ 
            const filtered_likes = comment.likes.filter(e=> e.toString() !== user_id )
            const result2 = await Comment.findByIdAndUpdate( comment_id , {likes: filtered_likes}).exec();
            const post2 = 
            await Post.findById(post_id)
            .populate('likes owner')
            .populate({ path:'comments', populate: { path:'owner'}} )
            .populate({ path:'comments', populate: { path:'comments', populate: "owner"}} )
            .exec();
            console.log(post2)
            return res.status(201).json(post2)
        }
        else{
            const result2 = await Comment.findByIdAndUpdate( comment_id , {likes: [...comment.likes, user_id]}).exec();
            console.log(result2)
            const post2 = 
            await Post.findById(post_id)
            .populate('likes owner')
            .populate({ path:'comments', populate: { path:'owner'}} )
            .populate({ path:'comments', populate: { path:'comments', populate: "owner"}} )
            .exec();
            console.log(post2)
            return res.status(201).json(post2)
        }
    }
    catch(err){ return res.send(err);}
})

module.exports = router;