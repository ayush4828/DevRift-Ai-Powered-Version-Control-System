
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const {Server} = require("socket.io")

const yargs = require("yargs");
const {hideBin} = require("yargs/helpers");

const {initRepo} = require("./controllers/init")
const {addRepo} = require("./controllers/add")
const {commitRepo} = require("./controllers/commit")
const {pushRepo} = require("./controllers/push")
const {pullRepo} = require("./controllers/pull")
const {revertRepo} = require("./controllers/revert")

yargs(hideBin(process.argv))
.command("start" , "start a new server" , {} , startServer)
.command("init","initialize a new Repository",{},initRepo)

.command("add <file>","Add a file to the Repository",
(yargs)=>{
  yargs.positional("file",{
    describe:"file to add to the staging area",
    type:"string"
  })},
(argv)=>{
  addRepo(argv.file);
})

.command("commit <message>","commit the stagged file",
(yargs)=>{
  yargs.positional("message",{
    describe:"Commit Message",
    type:"string"
  })},(argv)=>{
  commitRepo(argv.message);
})

.command("push","Push the file to S3",{},pushRepo)

.command("pull","Pull commit from S3",{},pullRepo)

.command("revert <commitId>","revert to a specific commit",
(yargs)=>{
  yargs.positional("commitId",{
    describe:"Commit id to revert to",
    type:"string"
  })},(argv)=>{
      revertRepo(argv.commitId);
  })

.demandCommand(1,"You Need At Least One Command").help().argv;


function startServer(){
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.json())
  app.use(express.json())

  const mongoURI = process.env.MONGO_URI;

  mongoose.connect(mongoURI).then(()=>{console.log("MongoDB Connected Successfully")}).catch((err)=>{console.error("unable to Connect",err)})

  app.use(cors({origin:"*"}));

  app.get("/" , (req,res)=>{
    res.send("welcome!!")
  })
  
  let user = "testUser"
  const httpServer = http.createServer(app)
  const io = new Server(httpServer,{
    cors:{
      origin:"*",
      methods:["GET","POST"]
    }
  });

  io.on("connection" , (socket)=>{
    socket.on("joinRoom",(userId)=>{
      user=userId;
      console.log("=====");
      console.log(user);
      console.log("=====");
      socket.join(userId)
    })
  })
  const db = mongoose.connection;
  db.once("open" , async ()=>{
    console.log("crud operations called")
  })

  httpServer.listen(port , ()=>{
    console.log(`Server is running on ${port}`);
  })
}