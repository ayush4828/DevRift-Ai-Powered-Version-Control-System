const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {MongoClient, ReturnDocument} = require("mongodb");
const dotenv = require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;

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

const getAllUsers = async(req,res)=>{
    try{
    await connectClient();
    const db = client.db("devrift");
    const usersCollection = db.collection("users");
    const users = await usersCollection.find({}).toArray();
    res.json(users)

    }
    catch(err){
      console.error("Error During the Login : " , err.message);
      res.status(500).send("server error");
    }

}

const getUserProfile = async(req,res)=>{
    const currId= req.params.id;
    try{
    await connectClient();
    const db = client.db("devrift");
    const usersCollection = db.collection("users");
    
    const user = await usersCollection.findOne({
        _id : new ObjectId(currId),
    }); 
    
    if(!user){
        return res.status(404).json({message:"User Not Found!!"})
    }
    res.send(user)
    }
    catch(err){
      console.error("Error During fetching : " , err.message);
      res.status(500).send("server error");
    }    
}
const updateUserProfile = async(req,res)=>{
    const currId = req.params.id;
    const {email,password} = req.body;

    try{
    await connectClient();
    const db = client.db("devrift");
    const usersCollection = db.collection("users");
    
    const updateFields = {email};
    if(password){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        updateFields.password = hashedPassword;
    }

    const result = await usersCollection.findOneAndUpdate(
        {
        _id:new ObjectId(currId)
         },
        {
            $set : updateFields
        },
        {
            returnDocument:"after"
        })

        if(!result){
         return res.status(404).json({message:"User Not Found!!"});
        }
        res.json(result);
    
    
    }
    catch(err){
      console.error("Error During update : " , err.message);
      res.status(500).send("server error");
    }
   
}
const deleteUserProfile=async(req,res)=>{
    const currId = req.params.id;
    
    try{
    await connectClient();
    const db = client.db("devrift");
    const usersCollection = db.collection("users");
    
    const result = await usersCollection.deleteOne({
        _id:new ObjectId(currId)
    })

    if(result.deleteCount == 0){
        return res.status(404).json({message:"User Not Found!!"})
    }
    res.json({message:"User Profile Deleted!!"})
    }
    catch(err){
      console.error("Error During deletion : " , err.message);
      res.status(500).send("server error");
    }
   
}

module.exports = {
    getAllUsers,
    signUp,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}