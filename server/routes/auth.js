// import express from 'express'


// import { signUp, login, logout, updateUser, getUserId } from '../controllers/UserController.js';
// import { authenticateUser } from '../middleware/authenticate.js';

const express = require('express');
const { signUp, login, logout, updateUser, getUserId } = require('../controllers/UserController.js');
const { authenticateUser } = require('../middleware/authenticate.js');

const router = express.Router();


router.post('/', signUp);
router.post('/login', login);
router.post('/logout', logout)
router.get('/:id',authenticateUser ,getUserId)
router.put('/:id',authenticateUser, updateUser)


module.exports = router;