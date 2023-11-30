// import mongoose from "mongoose";
const mongoose = require("mongoose");

const post = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author: {
        type:String,
        required:true
    },
    Date: {
        type:Date,
        default:Date.now
    },

})

const Blog = mongoose.model('Blog', post);

module.exports = {Blog};
// export default Blog;