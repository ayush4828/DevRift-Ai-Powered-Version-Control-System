const mongoose = require("mongoose");
const Repository = require("../model/repoModel");
const User = require("../model/userModel");
const Issue = require("../model/issueModel");


const createRepository = async(req,res)=>{
    const { owner, name, issues, content, description, visibility } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: "Repository name is required!" });
    }

    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invalid User ID!" });
    }

    const newRepository = new Repository({
      name,
      description,
      visibility,
      owner,
      content,
      issues,
    });

    const result = await newRepository.save();

    res.status(201).json({
      message: "Repository created!",
      repositoryID: result._id,
    });
  } catch (err) {
    console.error("Error during repository creation : ", err.message);
    res.status(500).send("Server error");
  }
}
const getAllRepositories = async(req,res)=>{
    res.send("all repos fetched success!");
}
const fetchRepositoryById = async(req,res)=>{
    res.send("repo fetch by id successfully");
}
const fetchRepositoryByName = async(req,res)=>{
    res.send("repo fetch by name successfully");
}
const fetchRepositoriesForCurrentUser = async(req,res)=>{
    res.send("repo fetch for logged in user successfully");
}
const updateRepositoryById = async(req,res)=>{
    res.send("repo updated successfully");
}
const toggleVisibilityById = async(req,res)=>{
    res.send("repo vissibility toggled");
}
const deleteRepositoryById = async(req,res)=>{
    res.send("repo deleted successfully");
}


module.exports = {
createRepository,
getAllRepositories,
fetchRepositoryById,
fetchRepositoryByName,
fetchRepositoriesForCurrentUser,
updateRepositoryById,
toggleVisibilityById,
deleteRepositoryById,
}