const getAllUsers = (req,res)=>{
    res.send("all users fetched");
}
const signUp = (req,res)=>{
    res.send("signUp Successfull!")
}
const login = (req,res)=>{
    res.send("login successfull!!");
}
const getUserProfile = (req,res)=>{
    res.send("user profile fetched");
}
const updateUserProfile = (req,res)=>{
    res.send("user profile updated sucessfully");
}
const deleteUserProfile=(req,res)=>{
    res.send("user profile deleted successfully");
}

module.exports = {
    getAllUsers,
    signUp,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile
}