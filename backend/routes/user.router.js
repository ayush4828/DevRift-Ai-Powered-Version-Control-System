const express = require("express");
const userController = require("../controllers/userController")

const userRouter = express.Router();

userRouter.get("/allusers" , userController.getAllUsers);
userRouter.post("/signup" , userController.signUp);
userRouter.post("/login" , userController.login);
userRouter.get("/userprofile" , userController.getUserProfile);
userRouter.put("/updateprofile" , userController.updateUserProfile);
userRouter.delete("/deleteprofile" , userController.deleteUserProfile);

module.exports = userRouter;
