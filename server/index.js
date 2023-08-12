require('dotenv').config();
const express = require('express');
const { createSchema, createYoga } = require('graphql-yoga');
const port = process.env.PORT || 5000;
const {typeDefs, resolvers} = require('./schema') ; 
const connectDB = require('./config/db');
const app = express();

// Connect to database
connectDB();

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

app.listen(port, console.log(`Server running on port ${port}`));