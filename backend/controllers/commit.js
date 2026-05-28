const fs = require("fs").promises;
const path = require("path");
const {v4 : uuidv4} = require("uuid");


async function commitRepo(message){
    
    const repoPath = path.resolve(process.cwd(),".devRift")
    const staggedPath = path.join(repoPath,"staging");
    const commitPath = path.join(repoPath,"commits")

    try{
    const commitId = uuidv4();
    const commitDir = path.join(commitPath,commitId);
    await fs.mkdir(commitDir,{ recursive : true })

    const files = await fs.readdir(staggedPath)

    for(const file of files){
        await fs.copyFile(path.join(staggedPath,file),path.join(commitDir,file))
    }
    await fs.writeFile(path.join(commitDir,"commit.json"),JSON.stringify({message , Date : new Date().toLocaleDateString()}))
    console.log(`Commit ${commitId} created with message : ${message}`)
    }
    catch(err){
        console.error("Error Commiting File" , err)
    }
}

module.exports = {commitRepo};