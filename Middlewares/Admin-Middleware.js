

const AdminMiddleware=(req,res,next)=>{
    const role=req.userInfo.role;

    if(role!="admin"){
        return res.status(401).json({
            success:false,
            "message":"Invalid Credentials,Admin rights required"
        })
    }

    next();
}