const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    courseInterest: String,
    claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
})
const EmployeeModal = mongoose.model("CRM-EMPLOYEE",employeeSchema);
module.exports={
    EmployeeModal
}