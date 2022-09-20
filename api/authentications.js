const router=require("express").Router();
const User=require("../model/user");
const mongoose=require("mongoose");
const passport=require("passport");
const fs=require("fs");
const path=require('path')
const crypto=require("crypto")
const multer=require("multer");
const { buffer } = require("stream/consumers");
const grid=require("gridfs-stream");
const { resolve } = require("path");
const user = require("../model/user");
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
   
let gfs;

const conn=mongoose.createConnection('mongodb+srv://1_haseeb:megasxlrrobo@cluster0.ntjml.mongodb.net/?retryWrites=true&w=majority')

conn.once('open',function(){
   //init stream
    gfs=grid(conn.db,mongoose.mongo)
   gfs.collection('profilepic');

});


//storage

const storage=new GridFsStorage(
    {
        url:'mongodb+srv://1_haseeb:megasxlrrobo@cluster0.ntjml.mongodb.net/?retryWrites=true&w=majority',
        file:(req,file)=>{
            return new Promise((resolve,reject)=>{
               crypto.randomBytes(16,(err,buf)=>{
                if(err){
                    return reject(err);
                }
                const filename=buf.toString('hex') + path.extname(file.originalname);
                const file_info={
                    filename:filename,
                    bucketName:'profilepic'
                };
                resolve(file_info);
               })
            })
        }
    }
)

//multer

const upload=multer({storage});







router.post("/signup",upload.single('file'),(req,res,next)=>{
    //res.json({file:req.file});
    if(req.file !== undefined){
        req.pic=req.file.id;
    }
    next();
   
    },async(req,res)=>{
        console.log(req.body.type);
        try{
        const {type,first_name,last_name,phone,email,password}=req.body;
        const full_name=first_name +' '+ last_name;

        const img=req.pic || null;
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
                    img:img,
                    email:email,
                    password:password,
                })
                user.save();
            }
        }).catch(err=>{
            console.log(err);
        })
    
        console.log("data saved");
    
        }
        
        catch(err){
            console.log(err);
        }
        
        
        
        })
    
    
    
    
    

router.get("/authenticationfail",(req,res)=>{
    res.json("not")
})


router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.json(req.user);
  });

  
    module.exports=router;