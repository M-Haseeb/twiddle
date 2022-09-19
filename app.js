const config=require("config");
const passport=require("passport");
const Strategy=require("./Config/strategy")(passport);
const db=require("./Config/db");
const express=require("express");
const sessions=require("express-session");
const user=require("./model/user");
const strategy=require("./Config/strategy")(passport);


const app=express();

//setting up configurations

db();

// setting middlewares

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(sessions({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));

app.use(passport.initialize());
app.use(passport.session()); 




app.set('template engine','ejs');


//routes
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.get('/login',(req,res)=>{
    res.render("login.ejs");
})

app.use("/",require("./api/authentications"));





//Port 

const Port=config.get("Port") || 3000;

app.listen(Port,()=>{
    console.log(`Server is running on Port: ${Port}`)
})