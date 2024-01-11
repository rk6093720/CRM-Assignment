const express = require("express");
const cors = require('cors')
const { connection } = require("./Config/db");
const { UserRouter } = require("./Routes/user.routes");
const { employeeRouter } = require("./Routes/employee.routes");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
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