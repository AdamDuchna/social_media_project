const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    owner: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: Object,
    }
})


module.exports = model("Post", postSchema);