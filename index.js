const express = require("express");
const { connection } = require("./Config/db");
const { UserRouter } = require("./Routes/user.routes");
const { employeeRouter } = require("./Routes/employee.routes");
require("dotenv").config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;
app.use("/auth",UserRouter);
app.use("/employee",employeeRouter)
app.listen(port, async()=>{
    try {
        await connection;
        console.log("DATABASE is connected Successfully");
    } catch (error) {
        console.log("DATABASE is not connected");
    }
    console.log(`listening port is ${port}`)
})