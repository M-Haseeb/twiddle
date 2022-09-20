const e = require("express");
const mongoose=require("mongoose");
//setting database connection

const db= async()=>{
    try{
        const str='mongodb+srv://1_haseeb:megasxlrrobo@cluster0.ntjml.mongodb.net/?retryWrites=true&w=majority';
        
await mongoose.connect(str).then((res,err)=>{
if(res){
    console.log("db connected");
}
if (err){
    throw err;
}
}).catch(err=>{
    console.log(err);
})
}
catch(err){
    console.log(err);
}
}
  module.exports=db;