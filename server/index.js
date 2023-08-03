require('dotenv').config();
const express = require('express');
// const createYoga = require('graphql-yoga');
const port = process.env.PORT || 5000;
const schema = require('./schema/') ; 

// const graphQLServer  = createYoga({schema});
const app = express();

// app.use(graphQLServer.graphqlEndpoint(schema));
console.log(schema);

app.listen(port, console.log(`Server running on port ${port}`));