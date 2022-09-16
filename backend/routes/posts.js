const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');


router.post("/post", async(req,res) => {
    try{         
        const { owner, text, image } = req.body;
        if (!owner) { return res.status(400).send("Please log in"); }
        const post = await Post.create({
            owner: owner._id,
            text: text,
            image: image,
        });
        return res.status(201).json(post); 
    }
    catch (err){ return res.send(err); }
})

router.get("/get", async(req,res) =>{
    try{ 
        
        const posts = await Post.find({}).populate('likes owner').populate({ path:'comments', populate: { path:'owner'}} ).exec();
        return res.status(201).json(posts) }
    catch (err){ return res.send(err); }
})

router.post("/like", async (req,res) =>{
    try{
        const { post_id , user_id } = req.body
        const post = await Post.findById(post_id)
        const result = post.likes.find( e => e.toString() === user_id )

        if(result){ 
            const filtered_likes = post.likes.filter(e=> e.toString() !== user_id )
            const result2 = await Post.findByIdAndUpdate( post_id , {likes: filtered_likes}).exec();
            const post2 = await Post.findById(post_id).populate('likes owner').populate({ path:'comments', populate: { path:'owner'}} ).exec();
            return res.status(201).json(post2)
        }
        else{
            const result2 = await Post.findByIdAndUpdate( post_id , {likes: [...post.likes, user_id]}).exec();
            const post2 = await Post.findById(post_id).populate('likes owner').populate({ path:'comments', populate: { path:'owner'}} ).exec();
            return res.status(201).json(post2)
        }

    }
    catch (err){ return res.send(err); }
})


router.post("/comment", async (req,res) => {
    try{
        const { user_id, post_id, comment} = req.body;
        console.log(user_id, post_id, comment)
        const result = await Comment.create({ owner: user_id ,text: comment})
        console.log(result)
        const result2 = await Post.findByIdAndUpdate( post_id, {$push: {comments: result._id }}).exec();
        const post2 = await Post.findById(post_id).populate('likes owner').populate({ path:'comments', populate: { path:'owner'}} ).exec();
        console.log(post2)
        return res.status(201).json(post2)
    }
    catch (err){ return res.send(err); }
})

module.exports = router;