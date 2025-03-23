const exp = require('express');
const mongoconnect = require('./db');
require('dotenv').config();
const app = exp();
const portno = process.env.PORT || 4000;  
let userAPI = require('./APIs/userAPI');
let authorAPI = require('./APIs/authorAPI');

mongoconnect().then(({usersCollection,authorsCollection})=>{
    app.use(exp.json());

    app.locals.usersCollection = usersCollection;
    app.locals.authorsCollection = authorsCollection;

    app.use('/users-api',userAPI(usersCollection));
    app.use('/authors-api',authorAPI(authorsCollection));
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