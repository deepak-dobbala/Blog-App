const exp = require('express');
const mongoconnect = require('./db');
const path=require('path');
require('dotenv').config();
const app = exp();
const portno = process.env.PORT || 4000;  
let userAPI = require('./APIs/userAPI');
let authorAPI = require('./APIs/authorAPI');
let AuthAPI = require('./APIs/Utils');

mongoconnect().then(({usersCollection,authorsCollection,articlesCollection})=>{
    app.use(exp.json());
    app.use(exp.static(path.join(__dirname,'../frontend/build')));
    app.use(exp.urlencoded({extended:true}));
    
    app.locals.usersCollection = usersCollection;
    app.locals.authorsCollection = authorsCollection;
    app.locals.articlesCollection = articlesCollection;

    app.use('/users-api',userAPI(usersCollection,articlesCollection));
    app.use('/authors-api',authorAPI(authorsCollection,articlesCollection));
    app.use('/auth',AuthAPI(authorsCollection,usersCollection));
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
    app.use((err, req, res, next) => {
        console.error('Error:', err);
        res.status(500).send('Something went wrong!');
    });
    console.log('collections Initialized');
    app.listen(portno, () => { console.log('Listening on port ',portno); });
}).catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
});