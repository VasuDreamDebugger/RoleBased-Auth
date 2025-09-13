require("dotenv").config();

const express =require("express");
const ConnectDatabase=require("./Database/db")
const AuthRouter =require("./Routes/Auth-route");
const HomeRouter=require("./Routes/Home-route");
const AdminRouter=require("./Routes/Admin-route")
const app=express();

const PORT=process.env.PORT;




//MiddleWares
app.use(express.json());

app.use("/api/auth",AuthRouter);
app.use("/api/home",HomeRouter);
app.use("/api/admin",AdminRouter)

//Database connection
ConnectDatabase();

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
});