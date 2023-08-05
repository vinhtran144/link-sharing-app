// This modulation technique is based featured in https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/
const  { merge } = require('lodash');
const makeExecutableSchema = require('@graphql-tools/schema');

const { 
    typeDef: Users, 
    resolvers: usersResolvers} = require('./users.js');
const { 
    typeDef: Links, 
    resolvers: linksResolvers} = require('./links.js');

// initiate Query with a random _empty string since Query type can't be empty
const Query = `
  type Query {
    _empty: String
  }
`;
const resolvers = {};

 const schema = makeExecutableSchema({
  typeDefs: Query + Users + Links,
  resolvers: merge(resolvers, usersResolvers, linksResolvers),
});
  
module.exports = schema;