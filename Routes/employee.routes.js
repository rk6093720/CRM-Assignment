const {Router}= require("express");
const { authentication } = require("../Middleware/authentication.middleware");
const { getClaimed, GetEmployee, PostEmployee, PutEmployee, DeleteEmployee } = require("../Controller/employee.controller");

const employeeRouter = Router();
//get employee by unclaimed 
employeeRouter.get("/read",GetEmployee);
//post 
employeeRouter.post("/create",PostEmployee);
//put
employeeRouter.put("/update/:id",authentication,PutEmployee);
//delete
employeeRouter.delete("/remove/:id",DeleteEmployee)
// PI to fetch leads claimed by logged-in users
employeeRouter.get("/lead",authentication,getClaimed)
module.exports={
    employeeRouter
}