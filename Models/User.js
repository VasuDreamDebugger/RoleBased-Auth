const mongoose =require("mongoose");

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,

    },
    password:{
        type:String,
        required:true
    },
    role:{
      type:String,
      enum:["user","admin"],
      default:"user"
    }
},{timestamps:true})

const USER = mongoose.model("USER",UserSchema);

module.exports =USER;