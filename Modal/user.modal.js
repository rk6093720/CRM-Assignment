const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email:{type:String},
    password:{type:String},
})
const UserModal = mongoose.model("CRM-USER", userSchema);
module.exports={
    UserModal
}