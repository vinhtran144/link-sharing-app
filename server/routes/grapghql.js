const {typeDefs, resolvers} = require('../schema') ; 
const { createSchema, createYoga } = require('graphql-yoga');
const express = require('express');

// setting up a Yoga graghql server
const graphQLServer = createYoga({
    schema: createSchema({
        typeDefs,
        resolvers,
    }),
    graphiql: process.env.NODE_ENV === 'development'  
})

// Create router for graphql request
const graphQLrouter = express.Router();
graphQLrouter.use(graphQLServer.graphqlEndpoint, graphQLServer);

module.exports = graphQLrouter