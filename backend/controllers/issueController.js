const mongoose = require("mongoose");
const Repository = require("../model/repoModel");
const User = require("../model/userModel");
const Issue = require("../model/issueModel");


const createIssue = async(req,res)=>{
   const {title,description} = req.body;
   const repoId = req.params.id;
 try {
    const issue = new Issue({
      title,
      description,
      repository: id,
    });

    await issue.save();

    res.status(201).json(issue);
  } catch (err) {
    console.error("Error during issue creation : ", err.message);
    res.status(500).send("Server error");
  }
}

const updateIssueById = async(req,res)=>{
    const id = req.params.id;
    const {title,description,status} = req.body
    try{
        const issue = await Issue.findById(id);
        if(!issue){
             return res.status(404).json({message:"Issue Not Found!!"})
        }

        issue.title = title;
        issue.description = description;
        issue.status = status;

        await issue.save();
        res.json(issue);
     } catch (err) {
    console.error("Error during issue updation : ", err.message);
    res.status(500).send("Server error");
  }
}

const deleteIssueById = async(req,res)=>{
    const id = req.params.id;
    
    try{
        const issue = await Issue.findByIdAndDelete(id);
        if(!issue){
             return res.status(404).json({message:"Issue Not Found!!"})
        }
        
        res.json({message:"Issue Deleted Successfully!! "});
     } catch (err) {
    console.error("Error during issue Deletion : ", err.message);
    res.status(500).send("Server error");
  }
}

const getAllIssues = async(req,res)=>{
   const repoId = req.params.id;
   try{
    const issues = await Issue.find({repository:repoId});
    if(!issues){
        return res.status(404).json({message:"issues Not Found!!"});
    }
    res.status(200).json(issues);
   }catch (err) {
    console.error("Error during issue fetching : ", err.message);
    res.status(500).send("Server error");
} }
const getIssueById = async(req,res)=>{
    const issueId = req.params.id;

    try{

        const issue = await Issue.findById(issueId);

        if(!issue){
            return res.status(404).json({message:"Issue Not Found!!"});
        }
        res.status(200).json(issue)

    }catch (err) {
    console.error("Error during issue fetching : ", err.message);
    res.status(500).send("Server error");
}
}

module.exports = {
createIssue,
updateIssueById,
deleteIssueById,
getAllIssues,
getIssueById,
}