const mongoose=require("mongoose");
const config=require("config");
//setting database connection

const db= async()=>{
    try{
await mongoose.connect(config.get("MongoUri"));
console.log("Database Connected");
    }

catch(err){
    console.log(err)
}
}
  module.exports=db;