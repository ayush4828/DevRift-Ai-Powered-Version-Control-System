const fs = require("fs").promises;
const path = require("path");


async function addRepo(filepath){
  const repoPath = path.resolve(process.cwd() , ".devRift")
  const stagingPath = path.join(repoPath , "staging")

  try{
    
     await fs.mkdir(stagingPath,{recursive:true})
     const filename = path.basename(filepath);
     await fs.copyFile(filepath,path.join(stagingPath,filename));
     console.log(`File ${filename} added to the staging area!`)
     
  }
  catch(err){
     console.error("Error In Adding File" , err)
  }
}

module.exports = {addRepo};