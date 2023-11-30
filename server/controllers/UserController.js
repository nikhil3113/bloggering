import bcrypt from 'bcryptjs';
import User  from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; // Import dotenv

dotenv.config(); 


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({
                message: 'Send All Required field'
            })
        }

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(404).json({
                message: 'User does not exist'
            });
        }


        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        // console.log(isPasswordCorrect);
        
        if (!isPasswordCorrect) {
            console.error('Password comparison error:', isPasswordCorrect);
            return res.status(400).json({
                message: 'Invalid Credentials'
            });
        }
        
    
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, username: existingUser.username }, process.env.JWT_SECRET, { expiresIn: 3 * 24 * 60 * 60 });
        // console.log(process.env.JWT_SECRET);
        // const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        // Log the decoded data for debugging
        // console.log('Decoded User Data:', decodedData);
        // console.log(token);
        // console.log(process.env.JWT_SECRET);
       

        res.cookie('token', token, { httpOnly: true });

        res.status(200).json({ message: existingUser, token, status: true });

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if(!username || !email || !password){
            return res.status(400).json({
                message: 'Send All Required field'
            })
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send({
                message: 'User already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // console.log("hased pass", hashedPassword);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: 'User created successfully'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token');

        // Send a response indicating successful logout
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUserId = async(req, res) =>{
    try{
        const {id}  = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }

}

export const updateUser = async(req, res) =>{
    const {username} = req.body;
    try{
        if(!username){
            return res.status(400).send({
                message: 'Send All Required field'
            })
        }
        const {id} = req.params;
        const result = await User.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).send({
                message: 'User not found'
            })
        }

        return res.status(200).send({message: 'User Updated'});


    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
}
