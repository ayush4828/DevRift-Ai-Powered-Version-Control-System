const fs = require("fs").promises;
const path = require("path");
const {s3,S3_Bucket} = require("../config/aws-config");


async function pullRepo(){
    const repoPath = path.resolve(process.cwd(),".devRift")
    const commitsPath = path.join(repoPath,"commits") 

    try{
      const data = await s3.listObjectsV2({
        Bucket:S3_Bucket,
        Prefix:"commits/",
      }).promise();
 
      const objects = data.Contents;
      for ( const object of objects){
        const key = object.Key;
        const commitDir = path.join(commitsPath , path.dirname(key).split("/").pop());

        await fs.mkdir(commitDir,{recursive:true})

        const params = {
            Bucket:S3_Bucket,
            Key : key
        }
        const fileContent = await s3.getObject(params).promise()
        await fs.writeFile(path.join(repoPath,key),fileContent.Body)
      }
      console.log("all commits pull from S3");

    }
    catch(err){
        console.error("Error in Pull from S3 : " , err)
    }
}

module.exports = {pullRepo};