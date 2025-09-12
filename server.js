require("dotenv").config();

const express =require("express");
const ConnectDatabase=require("./Database/db")
const AuthRouter =require("./Routes/Auth-route");

const app=express();

const PORT=process.env.PORT;




//MiddleWares
app.use(express.json());

app.use("/api/auth",AuthRouter)
//Database connection

ConnectDatabase();

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});