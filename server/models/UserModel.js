import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,    
    },
    password:{
        type:String,
        required:true,
    },  
});


const User = mongoose.model('User', userSchema);

export default User;