const createIssue = (req,res)=>{
    res.send("Issue created!");
}
const updateIssueById = (req,res)=>{
    res.send("issue updated by id!")
}
const deleteIssueById = (req,res)=>{
    res.send("issue deleted successfully by Id!")
}
const getAllIssues = (req,res)=>{
   res.send("all issues fetched")    
}
const getIssueById = (req,res)=>{
    res.send("issue is get by id");
}
module. exports = {
createIssue,
updateIssueById,
deleteIssueById,
getAllIssues,
getIssueById,
}