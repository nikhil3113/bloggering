
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const route = require("./routes/route.js");
const auth = require("./routes/auth.js");
const cors = require('cors');  
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(bodyParser.json()); 

app.use(cors());

app.use(cookieParser());

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Database connected");
    })
    .catch((error)=>{ 
        console.log(error);
    })

app.use('/', route);
app.use('/auth', auth);

let PORT = process.env.PORT || 5000; 
app.listen(PORT,()=>{
    console.log(`App is listening to port: ${PORT}`);
}) 
