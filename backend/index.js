require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cors=require("cors");

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            
  optionSuccessStatus:200,
}

const app = express();
app.use(express.json(),cors(corsOptions));
PORT = 5000

const user = require('./routes/user');
const posts = require('./routes/posts')
app.use('/posts',posts)
app.use('/user', user);


app.listen(PORT, () => {
    console.log(`API server listening at http://localhost:${PORT}`);
  });

