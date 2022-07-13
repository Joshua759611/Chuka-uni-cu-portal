const { user } = require("../models");
const db=require("../models");
const ROLES=db.ROLES;
const User=db.userl;
checkDuplicateUsernameOrEmail=(req,res,next)=>{
    //Username
    User.findOne({
        username:req.body.username
    }).exec((err,user)=>{
        if(err){
            res.status(400).send({message:"Failed! Username is already in use!"});
            return;
        }
        //Email
        User.findOne({
            email:req.body.email
        }).exec((err,user)=>{
            if(err){
                res.status(500).send({message:err});
                return;
            }
            next();
        });
    });
};
checkRolesExisted=(req,res,next)=>{
    if(req.body.role){
        for(let i=0;i<req.body.roles.length;i++){
            if(!ROLES.includes(req.body.rules[i])){
                res.status(400).send({
                    message:`Failed! Role ${req.body.rules[i]} does not exist!`
                });
                
                }
            }
        }
        next();
    };
    const verifySignUp={
        checkDuplicateUsernameOrEmail,
        checkRolesExisted
    };
    module.exports=verifySignUp;
