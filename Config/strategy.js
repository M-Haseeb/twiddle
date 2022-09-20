const LocalStrategy=require('passport-local').Strategy;
const User=require("../model/user");
module.exports=function(passport){

passport.use(new LocalStrategy({usernameField:'email'},
    (email,password,done) => {
    User.findOne({ email: email }).then((user)=>{
        if(!user){
            return done(null,false,{message:'you can not login'})
        }
        if(user.password != password){
            return done(null,false,{message:'you can not login'})
        }
        else{
            return done(null,user)
        }
    })
    .catch(err=>{
        console.log(err);
    })
    
    })

)

  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        email: user.email,
        //picture: user.picture
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });


}