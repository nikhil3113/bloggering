// import express from 'express';
// import { authenticateUser } from '../middleware/authenticate.js';
// import {Blog} from '../models/BlogModel.js';
// import { addBlog, deleteBlog, getId, showBlogs, updateBlog } from '../controllers/BlogController.js';

const express = require('express');
const { authenticateUser } = require('../middleware/authenticate.js');
const {Blog} = require('../models/BlogModel.js');
const { addBlog, deleteBlog, getId, showBlogs, updateBlog } = require('../controllers/BlogController.js');

const router = express.Router();

// nc12@gmail.com
// nikhil123

router.get('/', (req, res) => { 
  res.type('application/javascript');
  res.status(200).json({ message: 'Hello from server!' });
});

router.get('/home', authenticateUser, showBlogs);
//add
router.post('/home', authenticateUser, addBlog)

//get id
router.get('/:id',authenticateUser, getId)

//update
router.put('/:id',authenticateUser, updateBlog)

//delete
router.delete('/:id',authenticateUser, deleteBlog)




module.exports = router;