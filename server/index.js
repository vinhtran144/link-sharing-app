require('dotenv').config();
const express = require('express');
const { createSchema, createYoga } = require('graphql-yoga');
const port = process.env.PORT || 5000;
const {typeDefs, resolvers} = require('./schema') ; 

const app = express();

// start a Yoga graghql server
const graphQLServer = createYoga({
    schema: createSchema({
        typeDefs,
        resolvers
    }),
    graphiql: true
})

app.use(graphQLServer.graphqlEndpoint, graphQLServer);

app.listen(port, console.log(`Server running on port ${port}`));