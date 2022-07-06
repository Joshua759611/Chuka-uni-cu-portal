const express=require("express");
const cookieSession=require("cookie-session");
const cors=require("cors");
const app =express();

var corsOptions= {
    origin:"http://localhost:8081"
};
app.use(cors(corsOptions));

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