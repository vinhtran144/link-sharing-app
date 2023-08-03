import { makeExecutableSchema } from '@graphql-tools/schema'

// This modulation technique is based featured in https://www.apollographql.com/blog/backend/schema-design/modularizing-your-graphql-schema-code/
import { merge } from 'lodash';
import { 
    typeDef as Users, 
    resolvers as usersResolvers} from './users.js';
import { 
    typeDef as Links, 
    resolvers as linksResolvers} from './links.js';

// initiate Query with a random _empty string since Query type can't be empty
const Query = `
    type Query {
      _empty: String
    }
  `;

 const resolvers = {};

 export const schema = makeExecutableSchema({
    typeDefs: [ Query, Users, Links ],
    resolvers: merge(resolvers, usersResolvers, linksResolvers),
});
  
