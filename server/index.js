require('dotenv').config();
const express = require('express');
// const createYoga = require('graphql-yoga');
const port = 5000;
// const {schema} = require('./schema') ; 
const makeExecutableSchema = require('@graphql-tools/schema');

const schema = `
  type Query {
    hello: String
  }
`;

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: {
    Query: {
      hello: () => 'Hello, world!',
    },
  },
});

// const graphQLServer  = createYoga({schema});
const app = express();

// app.use(graphQLServer.graphqlEndpoint(schema));
// console.log(schema);

app.listen(port, console.log(`Server running on port ${port}`));