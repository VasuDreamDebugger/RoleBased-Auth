const express =require("express");

const AuthMiddleware =require("../Middlewares/Auth-Middleware");

const router=express.Router();

router.get("/welcome",AuthMiddleware,(req,res)=>{

    res.status(200).json({
        message:"Welcome to Home Page",
        data:req.userInfo
    })
})

module.exports=router;