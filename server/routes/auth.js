import express from 'express'
const router = express.Router();

import { signUp, login, logout, updateUser, getUserId } from '../controllers/UserController.js';
import { authenticateUser } from '../middleware/authenticate.js';


router.post('/', signUp);
router.post('/login', login);
router.post('/logout', logout)
router.get('/:id',authenticateUser ,getUserId)
router.put('/:id',authenticateUser, updateUser)


export default router; 