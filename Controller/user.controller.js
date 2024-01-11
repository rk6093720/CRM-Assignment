const { UserModal } = require("../Modal/user.modal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = process.env.SECRET;
const Register = async(req,res)=>{
    const {email,password}= req.body;
    try {
        const user = await UserModal.findOne({email});
        if(user){
            return res.status(401).json({msg:"Email is Already present",status:"error"})
        }
        const hashed = await bcrypt.hash(password,10);
        const newUser = await UserModal({
            email,
            password:hashed
        })
        await newUser.save();
        return res.status(200).json({status:"success", data:{newUser} ,msg:"Signup is Created Successfully"})
    } catch (error) {
        return res.status(500).json({status:"failed", data:{newUser} ,msg:"Signup is not created"})
    }
}

const Login = async(req,res)=>{
    const {email,password}= req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ status: "Error", msg: "Email and password are required" });
        }
        const login = await UserModal.findOne({email})
        if(!login){
            return res.status(401).json({status:"Error", msg:"Email is Already Present"})
        }
        if(await bcrypt.compare(password,login.password)){
            const token = jwt.sign({email: login.email}, secret,{
                expiresIn:"5m"
            })
            if ( token ) {
                    return res.status(200).json({ status: "success", data: { token, email}, msg:"user has login here" })
             }
            else{
                return res.status(401).json({ status: "failed",  msg:" it is only for admin" });
             }
        }else{
        return  res.status(401).json({ status: "error", error: "InvAlid Password",msg:"Invalid Password" });  
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:"fail",msg:"something went wrong"})
    }
}

module.exports={
    Register,
    Login
}