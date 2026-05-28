const fs = require("fs").promises;
const path = require("path");
const {s3,S3_Bucket} = require("../config/aws-config");



async function pushRepo(){
    const repoPath = path.resolve(process.cwd(),".devRift")
    const commitsPath = path.join(repoPath,"commits")

    try{
        const commitDirs = await fs.readdir(commitsPath);
        for(const commitDir of commitDirs){
            const commitPath = path.join(commitsPath,commitDir);
            const files = await fs.readdir(commitPath);

            for(const file of files){
                const filepath = path.join(commitPath,file);
                const fileContent = await fs.readFile(filepath);
                const params = {
                    Bucket : S3_Bucket,
                    Key : `commits/${commitDir}/${file}`,
                    Body : fileContent
                }
                await s3.upload(params).promise()
            }
        }
        console.log("All Commits Pushed To the S3");
    }
    catch(err){
        console.error("Error pushing to the S3:" , err)
    }
}

module.exports = {pushRepo};