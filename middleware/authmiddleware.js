const User = require("../model/adminModel");
const jwt = require("jsonwebtoken");
const asynchandler = require("express-async-handler");

const authMiddleware = asynchandler( async(req,res,next)=>{
    let token;
    console.log(req.headers.authorization);
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token=req?.headers?.authorization.split(" ")[1]
        console.log(token)
        try{
            if(token){
                
                const decoded = jwt.verify(token,process.env.secret_key)
                console.log(decoded)
                const finduser = await User.findById(decoded?.id)
                req.user = finduser
                next();
            }
        }
        catch(error){
            throw new Error("not a authorized token please login again!");
        }
    }else{
        throw new Error("no token attached with request");
    }
})
const isValid = asynchandler( async(req,res,next)=>{
    console.log(req.user);
    const{email}= req.user
    const findadmin = await User.findOne({email:email})
    if(!findadmin){
        throw new Error("not a verified admin!!")
    }
    else{
       next();
    }
})
const isAdmin = asynchandler( async(req,res,next)=>{
    console.log(req.user);
    const{email}= req.user
    const findadmin = await User.findOne({email:email})
    if(findadmin.superAdmin !== true){
        throw new Error("not a verified super admin!!")
    }
    else{
       next();
    }
})
const isValidForEventManipulation= 
asynchandler( async(req,res,next)=>{
    console.log(req.user);
    const{email}= req.user
    const findadmin = await User.findOne({email:email})
    if(findadmin.superAdmin === true|| findadmin.subAdmin===true){
        next();
    }
    else{
        throw new Error("not a verified super admin!!")
    }
})
const isAuthenticatedforRegistrationDESkManipulations = asynchandler(async(req,res,next)=>{
    const{email}=req.user
    const findadmin = await User.findOne({email:email});
    if(findadmin) {
        next()
    }
    else{
        throw new Error("you are not a authenticated person!");
    }
})
module.exports=  {authMiddleware,isAdmin,isValid,isValidForEventManipulation,isAuthenticatedforRegistrationDESkManipulations};