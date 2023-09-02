require('dotenv').config();
const express = require('express');
const { createSchema, createYoga } = require('graphql-yoga');
const port = process.env.PORT || 5000;
const {typeDefs, resolvers} = require('./schema') ; 
const db = require('./config/database');
const app = express();
const connectMongo = require('connect-mongo');
const session = require('express-session');


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

        // start a Yoga graghql server
    const graphQLServer = createYoga({
        schema: createSchema({
            typeDefs,
            resolvers,
        }),
        // session data will be available in req fields
        // in the future passport will provide data to req field
        graphiql: process.env.NODE_ENV === 'development'  
    })

    app.use(graphQLServer.graphqlEndpoint, graphQLServer);



    app.get('/',(req,res,next)=>{
        console.log(req.session);
        res.send('Hello World');
    })
});