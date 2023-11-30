import mongoose from "mongoose";

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

export const Blog = mongoose.model('Blog', post);

// export default Blog;