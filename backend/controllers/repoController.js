const mongoose = require("mongoose");
const Repository = require("../model/repoModel");
const User = require("../model/userModel");
const Issue = require("../model/issueModel");


const createRepository = async(req,res)=>{
    
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