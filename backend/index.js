require("dotenv").config();
require("./config/database").connect();
const express = require("express");

const app = express();
app.use(express.json());
PORT = 5000

const user = require('./routes/user');
app.use('/user', user);


app.listen(PORT, () => {
    console.log(`API server listening at http://localhost:${PORT}`);
  });

