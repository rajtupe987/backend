const express=require("express");
const { connection } = require("./config/db");
const {userRouter}=require("./Routes/user.route");
const {todos}=require("./Routes/todos.route");
const cors=require("cors");

require("dotenv").config()

const app=express();
app.use(express.json());

app.use(cors())

app.use("/user",userRouter);
app.use("/todos",todos);


app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})






app.listen(process.env.port,async()=>{

    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log("Error while connecting to DB");
        console.log(error)
    }
   console.log(`port is running at ${process.env.port}`)
})