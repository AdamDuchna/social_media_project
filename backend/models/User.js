const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    first_name: { 
        type: String,
        default: null,
        required: true
    },
    last_name: { 
        type: String, 
        default: null,
        required: true  
    },
    username: { 
        type: String, 
        unique: true,
        required: true  
    },
    password: { 
        type: String,
        required: true  
    },
    registrationDate: Date,
    friends: [String],
    token: { type: String },
    image: {
        type: Object,
    }
});

module.exports = model("User", userSchema);