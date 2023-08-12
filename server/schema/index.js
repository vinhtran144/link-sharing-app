// This modulation technique is based featured in https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/
const  { merge } = require('lodash');

const { 
    typeDef: Users, 
    resolvers: usersResolvers} = require('./users.js');
const { 
    typeDef: Links, 
    resolvers: linksResolvers} = require('./links.js');

// initiate Query with a random _empty string since Query type can't be empty
// then each individual can extends Query object
const Query = `
  type Query {
    _empty: String
  }
`;

// Combine every individual typeDef and resolvers and export

const typeDefs=  [Query , Users, Links];
const resolvers= merge(usersResolvers, linksResolvers);

  
module.exports = {typeDefs, resolvers};