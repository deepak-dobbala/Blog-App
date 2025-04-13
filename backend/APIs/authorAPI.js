const exp=require('express');
const expressasynchandler=require('express-async-handler');
const verifyToken = require('../middleware/verifytoken');

module.exports = (authorsCollection,articlesCollection)=>{
    const authorAPI = exp.Router();

    authorAPI.post('/new-article',verifyToken, expressasynchandler(async(req,res,err)=>{
        let article =req.body;
        let userexists=await authorsCollection.findOne({username:article.username});
        if(!userexists){
            return res.status(404).json({message:"Creation of Article not authorized"});
        }
        articlesCollection.insertOne(article);
        res.send({message:"Article Created"});
    }));
    authorAPI.post('/edit-article/:id',verifyToken,expressasynchandler((req,res,err)=>{
        let article = req.body;
        let id = req.params.id;
        articlesCollection.updateOne({articleID:id},{$set:{...article}});
        res.send({message:"Article Updated"});
    }));
    authorAPI.post('/delete-article/:id',verifyToken,expressasynchandler((req,res,err)=>{
        let id=req.params.id;
        articlesCollection.updateOne({articleID:id},{$set:{status:false}});
        res.send({message:"Article Deleted"});
    }));
    authorAPI.get('/articles/:authorname',verifyToken,expressasynchandler(async (req,res,err)=>{
        let authorname = req.params.authorname;
        let articles = await articlesCollection.find({username:authorname,status:true}).toArray();
        if (articles.length===0){
            return res.status(404).json({message:"No articles found"});
        }
        res.status(200).json({message:"Articles Retreived",payload:articles});
    }));

    return authorAPI;
};