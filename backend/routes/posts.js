const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');


router.post("/post", async(req,res) => {
    console.log(req.body)
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
        const posts = await Post.find({}).populate('owner')

        return res.status(201).json(posts) }
    catch (err){ return res.send(err); }
})

module.exports = router;