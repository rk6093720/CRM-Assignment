const { EmployeeModal } = require("../Modal/employee.modal");
const { UserModal } = require("../Modal/user.modal");

const GetEmployee = async(req,res)=>{
    try {
        const unclaimedLeads = await EmployeeModal.find({ claimedBy: null });
        res.json(unclaimedLeads);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
const PostEmployee = async(req,res)=>{
    const { name, email, courseInterest } = req.body;
    try {
        if(await EmployeeModal.findById({_id}) || await EmployeeModal.findOne({email})){
            return res.status(400).json({ status: 'error', message: 'User already exists' });
        }
    const lead = new EmployeeModal({ name, email, courseInterest });
    await lead.save();
    res.status(201).json({ message: 'Employee submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}
const PutEmployee = async(req,res)=>{
    const { leadId } = req.params;
    try {
      const employee = await UserModal.findOne({ email: req.user.email });
      const lead = await EmployeeModal.findByIdAndUpdate(
        leadId,
        { claimedBy: employee._id },
        { new: true }
      );
      res.status(200).json({lead, status:"Success",msg:"Updated successfully"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
const DeleteEmployee = async(req,res)=>{
    const {id}= req.params;
    try {
        const deleteEmployee = await EmployeeModal.findOneAndDelete({_id:id})
        res.status(200).send({status:"success",delete:deleteEmployee})
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: "error"})
    }

}
const getClaimed = async(req,res)=>{
    try {
        const employee = await UserModal.findOne({ email: req.user.email });
        const myLeads = await EmployeeModal.findOne({ claimedBy: employee._id });
        res.status(200).json({myLeads, status:"Success"});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
module.exports={
    GetEmployee,
    PostEmployee,
    PutEmployee,
    DeleteEmployee,
    getClaimed
}