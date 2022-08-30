const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const TOKEN_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

const User = require('../models/User');

router.post("/register", async (req,res) => {
    try {
        const { firstName, lastName, username, password } = req.body;
        if (!(username && password && firstName && lastName)) { return res.status(400).send("All fields are required"); }

        const checkUser = await User.findOne({ username });
        if(checkUser){ return res.status(409).send("This user already exists.")}

        encryptedUserPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: encryptedUserPassword,
            registrationDate: new Date(),
          });

        const token = jwt.sign( { user_id: user._id, username }, TOKEN_KEY, { expiresIn: "5h" } );
        user.token = token;
        return res.status(201).json(user);    
    }
    catch (err){ return res.send(err); }
})

router.post("/login", async (req,res) => {
    const { username, password } = req.body;
    if (!(username && password )){ return res.status(400).send("All fields are required"); }

    const user = await User.findOne({ username });
    
    if (user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign( { user_id: user._id, username }, TOKEN_KEY, { expiresIn: "5h" } );
        user.token = token;
        return res.status(200).json(user);}

    return res.status(400).send("Invalid Credentials");  
})

module.exports = router;