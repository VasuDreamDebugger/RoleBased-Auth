const mongoose =require("mongoose");
const express =require("express");

const {registerUser}=require("../Controllers/Auth-controller.js")

const router =express.Router();



router.post("/register", registerUser );

 


module.exports=router;
