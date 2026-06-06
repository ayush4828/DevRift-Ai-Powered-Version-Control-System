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
    try{
        const repositories = await Repository.find({}).populate("owner").populate("issues");
        res.json(repositories);
    }
    catch (err) {
    console.error("Error during fetching the repositories : ", err.message);
    res.status(500).send("Server error");
  }
}
const fetchRepositoryById = async(req,res)=>{
    const repoId = req.params.id
    try{
        const repository = await Repository.findById(repoId).populate("owner").populate("issues");
        if(!repository){
            return res.status(404).json({message:"repository Not Found!!"})
        }
        res.json(repository);
    }
    catch (err) {
    console.error("Error during fetching the repositories : ", err.message);
    res.status(500).send("Server error");
    }

}
const fetchRepositoryByName = async(req,res)=>{
        const repoName = req.params.name
    try{
        const repository = await Repository.findOne({name:repoName}).populate("owner").populate("issues");
        if(!repository){
            return res.status(404).json({message:"Repository Not Found!!"})
        }
        res.json(repository);
    }
    catch (err) {
    console.error("Error during fetching the repository : ", err.message);
    res.status(500).send("Server error");
    }

}
const fetchRepositoriesForCurrentUser = async(req,res)=>{
    const userId = req.params.userId;

    try{

      const repositories = await Repository.find({owner:userId});

      if(!repositories || repositories.length == 0){
        return res.status(404).json({message:"User Repositorie Not Found!!"})
      }
      res.json({message:"repositories found!!" , repositories})

    }catch (err) {
        console.error("Error during fetching the user's repository : ", err.message);
        res.status(500).send("Server error");
    }
}
const updateRepositoryById = async(req,res)=>{
     
     const repoId = req.params.id;
     const {content,description} = req.body;
    try{
      const repository = await Repository.findById(repoId);

      if(!repository){
        return res.status(404).json({message:"Repository Not Found!!"})
      }

      repository.content.push(content);
      repository.description = description || repository.description;
      const updatedRepo = await repository.save()
      res.json({message:"Repository Updated successfully!!" , updatedRepo})

    }catch (err) {
        console.error("Error during updating the repository : ", err.message);
        res.status(500).send("Server error");
    }
}
const toggleVisibilityById = async(req,res)=>{
    const repoId = req.params.id;
    
    try{
      const repository = await Repository.findById(repoId);

      if(!repository){
        return res.status(404).json({message:"Repository Not Found!!"})
      }

      repository.visibility = !repository.visibility;
      const updatedRepo = await repository.save()
      res.json({message:"Visibility Toggled!!" , updatedRepo})

    }catch (err) {
        console.error("Error during Toggle the visibillity of repository : ", err.message);
        res.status(500).send("Server error");
    }
}
const deleteRepositoryById = async(req,res)=>{
    const repoId = req.params.id;
    
    try{
      const repository = await Repository.findByIdAndDelete(repoId);

      if(!repository){
        return res.status(404).json({message:"Repository Not Found!!"})
      }

      
      res.json({message:"Repository Deleted Successfully!!"})

    }catch (err) {
        console.error("Error during Toggle the visibillity of repository : ", err.message);
        res.status(500).send("Server error");
    }
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