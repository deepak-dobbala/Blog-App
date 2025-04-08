const exp = require('express');
const expressasynchandler = require('express-async-handler');

module.exports = (usersCollection, articlesCollection) => {
    const userAPI = exp.Router();

    userAPI.get('/articles', expressasynchandler(async (req, res) => { // Removed `err`
        let articles = await articlesCollection.find({ status: true }).toArray();
        res.status(200).send({ message: "All articles Retrieved", payload: articles });
    }));
    userAPI.post('/comment/:articleid',expressasynchandler(async (req, res) => {
        let articleid=req.params.articleid
        let comment = req.body;
        await articlesCollection.updateOne({articleID:articleid}, {$addToSet: {comments: comment}});
        res.status(200).send({ message: "Comment added successfully" });
    }));

    return userAPI;
};
