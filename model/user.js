const mongoose=require("mongoose");


const user_schema=mongoose.Schema({


    type:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    }
    ,
    full_name:{
      type:String,
      required:true
    },
    wallet:{
        type:Number,
        default:0
    },
    phone:{
        type:String,
        required:true
    },
    img:{
      type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
    date:{
        type:Date,
        default:Date.now()
    }


});

const user=mongoose.model('user',user_schema);

module.exports=user;
