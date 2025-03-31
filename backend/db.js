const mongoose = require('mongoose');
require('dotenv').config();
const mongo_url = process.env.DB_URL || 'http://localhost:27021/blogserer';

let mongoconnect = async () => {
    try {
        const connection = await mongoose.connect(mongo_url, {});
        console.log("Connected to MongoDB");
        const db = connection.connection.db;

        const usersCollection = db.collection("users");
        const authorsCollection = db.collection("authors");
        const articlesCollection = db.collection("articles");


        return { usersCollection, authorsCollection, articlesCollection }; 
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
};

module.exports = mongoconnect;
