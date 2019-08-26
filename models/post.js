const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:"Title is required",
        minlength:4,
        max:150
    },
    body:{
        type:String,
        required:"body is required",
        minlength:4,
        max:2000 
    }
});
module.exports = mongoose.model("Post",postSchema);