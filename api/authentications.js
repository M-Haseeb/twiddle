const router=require("express").Router();
const User=require("../model/user");
const mongoose=require("mongoose");
const passport=require("passport");
const fs=require("fs");
const multer=require("multer");
const { buffer } = require("stream/consumers");

   
    


router.post("/signup",async(req,res)=>{

    try{
    const {type,first_name,last_name,phone,email,password}=req.body;
    const full_name=first_name +' '+ last_name;


    await User.findOne({email:email}).then((user)=>{
        if(user){
            res.json("Account Exits");
        }
        else{
            const user = new User({
                type:type,
                first_name:first_name,
                last_name:last_name,
                full_name:full_name,
                phone:phone,
                email:email,
                password:password,
            })
            user.save();
        }
    }).catch(err=>{
        console.log(err);
    })

    console.log("data saved");
    res.end();
    }
    
    catch(err){
        console.log(err);
    }
    
    
    
    })

router.get("/authenticationfail",(req,res)=>{
    res.json("not allowed")
})


router.get("/authenticationpass",(req,res)=>{
    res.json("you are allowed")
})

router.post('/login', passport.authenticate('local',{
    failureRedirect:"/authenticationfail",
successRedirect:"/authenticationpass"}
    
    
    ))
    module.exports=router;