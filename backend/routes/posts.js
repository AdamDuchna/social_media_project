const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');


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
        
        const posts = await Post.find({}).populate('likes owner').exec()
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
            const result = await Post.findByIdAndUpdate( post_id , {likes: filtered_likes}).populate('likes owner').exec()
            return res.status(201).json(result)
        }
        else{ 
            const result = await Post.findByIdAndUpdate( post_id , {likes: [...post.likes, user_id]}).populate('likes owner').exec()
            return res.status(201).json(result)
        }

    }
    catch (err){ return res.send(err); }
})

module.exports = router;