const yargs = require("yargs");
const {hideBin} = require("yargs/helpers");

const {initRepo} = require("./controllers/init")
const {addRepo} = require("./controllers/add")
const {commitRepo} = require("./controllers/commit")
const {pushRepo} = require("./controllers/push")
const {pullRepo} = require("./controllers/pull")
const {revertRepo} = require("./controllers/revert")

yargs(hideBin(process.argv))
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