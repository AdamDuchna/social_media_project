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
    },
    likes: { type: [Schema.ObjectId], ref: 'User' },
    comments: { type: [Schema.ObjectId], ref: 'Comment' },
    creationDate: Date,
})


module.exports = model("Post", postSchema);