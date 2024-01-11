const {Router}= require("express");
const { Register, Login } = require("../Controller/user.controller");
const UserRouter = Router();
// signup
UserRouter.post("/signup",Register);
UserRouter.post("/login",Login)
module.exports={
    UserRouter
}