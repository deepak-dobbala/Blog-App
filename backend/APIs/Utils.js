const exp= require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expressasynchandler = require('express-async-handler');
require('dotenv').config();
AuthAPI=exp.Router()

module.exports=(authorsCollection,usersCollection)=>{
    AuthAPI.post('/login',expressasynchandler(async(req,res)=>{
        const userCred=req.body;
        //check if user exists
        let userorauthor;
        if(userCred.userType=='author'){
            userorauthor=await authorsCollection.findOne({username:userCred.username});
            if(!userorauthor){
                return res.status(400).send({message:'Author does not exist'});
            }
        }
        if(userCred.userType=='user'){
            userorauthor=await usersCollection.findOne({username:userCred.username});
            if(!userorauthor){
                return res.status(400).send({message:'User does not exist'});
            }
        }
        //compare password
        const isMatch=await bcryptjs.compare(userCred.password,userorauthor.password);
        if(!isMatch){
            return res.status(400).send({message:'Invalid Credentials'});
        }
        //make jwt and send response
        const token=jwt.sign({username:userCred.username},process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
        delete userorauthor.password;
        if (userCred.userType=='author'){
            res.status(200).send({message:'Author Logged in successfully',token:token,payload:userorauthor});
        }
        if (userCred.userType=='user'){
            res.status(200).send({message:'User Logged in successfully',token:token,payload:userorauthor});
        }
    }));
    AuthAPI.post('/register',expressasynchandler(async(req,res)=>{
        const userCred=req.body;
        //check if user exists
        if(userCred.userType=='author'){
            const author=await authorsCollection.findOne({username:userCred.username});
            if(author){
                return res.status(400).send({message:'Author already exists'});
            }
        }
        if(userCred.userType=='user'){
            const user=await usersCollection.findOne({username:userCred.username});
            if(user){
                return res.status(400).send({message:'User already exists'});
            }
        }
        // hash password
        const hashed=await bcryptjs.hash(userCred.password,10);
        userCred.password=hashed;
        //save to data base
        if(userCred.userType=='author'){
            await authorsCollection.insertOne(userCred);
        }
        if(userCred.userType=='user'){
            await usersCollection.insertOne(userCred);
        }
        if(userCred.userType=='author'){
            res.status(200).send({message:'Author Registered successfully',payload:userCred});
        }
        if(userCred.userType=='user'){
            res.status(200).send({message:'User Registered successfully',payload:userCred});
        }

    }));
    return AuthAPI;
};
