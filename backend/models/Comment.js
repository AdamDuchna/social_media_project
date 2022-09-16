const { Schema, model } = require('mongoose');
const commentSchema = new Schema({
    owner: { 
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
})


module.exports = model("Comment", commentSchema);