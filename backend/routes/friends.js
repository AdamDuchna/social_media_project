const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User');


router.post('/add', async (req,res)=>{
    try{
        const { user_id, profile_id} = req.body;
        const user = await User.findById(user_id)
        const requestsList = user.requests.filter( e => e.toString() !== profile_id)
        const accept_request= await User.findByIdAndUpdate( user_id, { $push: {friends: profile_id}, requests:requestsList });
        const accept_request2= await User.findByIdAndUpdate( profile_id, { $push: {friends: user_id}} );
        const result1 = await User.findById( user_id).populate('friends requests following').exec();
        return res.status(201).json(result1)
    }
    catch(err){ return res.send(err);}
})

router.post('/remove', async (req,res)=>{
    try{
        const { user_id, profile_id} = req.body;
        const user = await User.findById(user_id)
        const requestsList = user.friends.filter( e => e.toString() !== profile_id);
        const removeFriend = await User.findByIdAndUpdate( user_id, { friends: requestsList });

        const user2 = await User.findById(profile_id)
        const requestsList2 = user2.friends.filter( e => e.toString() !== user_id);
        const removeFriend2 = await User.findByIdAndUpdate( profile_id, { friends: requestsList2 });

        const result1 = await User.findById( user_id).populate('friends requests following').exec();
        const result2 = await User.findById( profile_id).populate('friends requests following').exec();
        return res.status(201).json({user:result1, profile:result2}) 
    }
    catch(err){ return res.send(err);}
})
module.exports = router;