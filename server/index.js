require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 5000;
const db = require('./config/database');
const app = express();

const graphQLrouter = require('./routes/grapghql');
const restRouter = require('./routes/rest');
const connectMongo = require('connect-mongo');
const session = require('express-session');
const passport = require('passport');


db.once('open',()=>{
    console.log(`Connected to host ${db.host}`);
    app.listen(port, console.log(`Server running on port ${port}`));
    const sessionStore = connectMongo.create({
        client: db.client
    });
    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
        }
    }));

 

    // make sure passport will authenticate every route with session method
    app.use(passport.authenticate('session'));
    // app.use(passport.session());

    app.use(restRouter);
    app.use(graphQLrouter);



    app.get('/',(req,res,next)=>{
        console.log(req.session);
        res.send('Hello World');
    })
});