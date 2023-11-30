import {Blog} from '../models/BlogModel.js';
import User  from '../models/UserModel.js';


//create new blog
export const addBlog = async (req, res) => {
    const{title, content} = req.body;
    try{
        if (!req.user || !req.user.username) {
            return res.status(400).json({ message: 'Invalid user information in the request.' });
        }

        if(!title || !content ){
            return res.status(400).send({
                message: 'Send All Required field'
            })
        }

        const newBlog = {
            title,
            content,
            author: req.user.username,
        }

        const blog = await Blog.create(newBlog);
        return res.status(201).send(blog);

    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
}

//get all blogs
export const showBlogs = async (req, res) => {
    const token = req.headers.authorization;
    try {
        const blogs = await Blog.find({});
        res.status(200).json({
            count: blogs.length,
            data: blogs,
            token: token
        })

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
}

//get one blog by id
export const getId = async(req, res) =>{
    try{
        const {id}  = req.params;
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }

}

//update blog
export const updateBlog = async(req, res) =>{
    const {title, content} = req.body;
    try{
        if(!title || !content){
            return res.status(400).send({
                message: 'Send All Required field'
            })
        }
        const {id} = req.params;
        const result = await Blog.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).send({
                message: 'Blog not found'
            })
        }

        return res.status(200).send({message: 'Blog Updated'});


    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
}


//delete blog

export const deleteBlog = async(req, res) =>{
    try{
        const {id} = req.params;
        const result = await Blog.findByIdAndDelete(id);

        if(!result){
            return res.status(404).send({
                message: 'Blog not found'
            })
        }
        return res.status(200).send({message: 'Blog Deleted Successfully'});

    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
}