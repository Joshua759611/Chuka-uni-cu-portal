const express=require("express");
const cookieSession=require("cookie-session");
const cors=require("cors");
const app =express();


var corsOptions= {
    origin:"http://localhost:8081"
};
app.use(cors(corsOptions));
// opening mongoose connection to MongoDB
const db=require("./app/models");
const { connect } = require("mongoose");
const { count } = require("../app/models/role.model");
const Role=db.role;
db.mongoose;
connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Successfully Connected to MongoDB.");
    initial();
})
.catch(err=>{
    console.error("Connection Error", err);
    process.exit();
});

//parse requests for content-type -application/json
app.use(express.json());

//parse requests for content-type -application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));
app.use(
    cookieSession({
        name:"ChukaUniCU",
        secret:"COOKIE_SECRET", //should be a secret environment variable
        httpOnly:true
    })
);
//simple route
app.get("/", (req,res)=> {
    res.json({message:"Welcome To Chuka University Christian Union Portal."});

});
//set port, listen for requests
const PORT =process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
});
function initial(){
    Role.estimatedDocumentCount((err,count)=>{
        if(!err&&count===0){
            new Role({
                name:"user"
            }).save(err=>{
                if(err){
                    console.log("error",err);
                }
                console.log("Added 'user' to roles collection");

            });
            
        new Role({
                name:"moderator"
            }).save(err=>{
                if(err){
                    console.log("error",err);
                }
                console.log("added 'moderator' to roles connection");
            });
            new Role({
                name:"admin"
            }).save(err=>{
                if(err){
                    console.log("error",err);
                }
                console.log("added 'admin' to roles connection");
            });
        }
    })
}