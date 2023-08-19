require('dotenv').config();
const express = require('express');
const { createSchema, createYoga } = require('graphql-yoga');
const port = process.env.PORT || 5000;
const {typeDefs, resolvers} = require('./schema') ; 
const db = require('./config/db');
const app = express();
const connectMongo = require('connect-mongo');
const session = require('express-session');



// start a Yoga graghql server
const graphQLServer = createYoga({
    schema: createSchema({
        typeDefs,
        resolvers
    }),
    graphiql: process.env.NODE_ENV === 'development'  
    // in theory, graphiql should only be acivated when value NODE_ENV is in development
    // however, it doesn't seems to disable when NODE_ENV is something else
})

app.use(graphQLServer.graphqlEndpoint, graphQLServer);

db.once('open',()=>{
    console.log(`Connected to host ${db.host}`);
    app.listen(port, console.log(`Server running on port ${port}`));
    const store = connectMongo.create({
        client: db.client
    });
    
});