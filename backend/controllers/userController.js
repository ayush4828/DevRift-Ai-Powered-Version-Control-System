const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {MongoClient} = require("mongodb");
const dotenv = require("dotenv").config();

let client;
const uri = process.env.MONGO_URI;

async function connectClient(){
    if(!client){
        // client = new MongoClient(uri,{useNewUrlParser:true,useUnifiedTopology:true})
        client = new MongoClient(uri);
    }
    await client.connect();
}

const signUp = async(req,res)=>{
    const {username,email,password} = req.body;
    try{
    await connectClient();
    const db = client.db("devrift");
    const usersCollection = db.collection("users");
    
    const user = await usersCollection.findOne({username}); 

    if(user){
        return res.status(400).json({message:"user already exists!!"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    
    const newUser = {
        username,
        password:hashedPassword,
        email,
        repositories:[],
        followedUser:[],
        starRepos:[]
    }

   let result = await usersCollection.insertOne(newUser);

   const token = jwt.sign({id:result.insertId},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
   res.json({token,userId:result.insertId});
    }
    catch(err){
      console.error("Error During the SignUp : " , err.message)
      res.status(500).send("server error")
    }

}
const login = async(req,res)=>{
     const {email,password} = req.body;
    try{
    await connectClient();
    const db = client.db("devrift");
    const usersCollection = db.collection("users");
    
    const user = await usersCollection.findOne({email}); 
    
    if(!user){
        return res.status(400).json({message:"Invalid Credential!!"})
    }
    
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({message:"Invalid Credential!!"})
    }

   const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
   res.json({token,userId:user._id});
    }
    catch(err){
      console.error("Error During the Login : " , err.message);
      res.status(500).send("server error");
    }

}

const getAllUsers = (req,res)=>{
    res.send("all users fetched");
}

const getUserProfile = (req,res)=>{
    res.send("user profile fetched");
}
const updateUserProfile = (req,res)=>{
    res.send("user profile updated sucessfully");
}
const deleteUserProfile=(req,res)=>{
    res.send("user profile deleted successfully");
}

module.exports = {
    getAllUsers,
    signUp,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}