const createRepository = (req,res)=>{
    res.send("repo created successfully");
}
const getAllRepositories = (req,res)=>{
    res.send("all repos fetched success!");
}
const fetchRepositoryById = (req,res)=>{
    res.send("repo fetch by id successfully");
}
const fetchRepositoryByName = (req,res)=>{
    res.send("repo fetch by name successfully");
}
const fetchRepositoriesForCurrentUser = (req,res)=>{
    res.send("repo fetch for logged in user successfully");
}
const updateRepositoryById = (req,res)=>{
    res.send("repo updated successfully");
}
const toggleVisibilityById = (req,res)=>{
    res.send("repo vissibility toggled");
}
const deleteRepositoryById = (req,res)=>{
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