const {users}  = require('../sampleData');

const typeDef = `
    extend type Query {
        user(id: String!): User
    }

    type User {
        id: String!
        name: String!
        linkIDs: [String]
        devLinkURL: String!
    }
`;

const resolvers ={
    Query:{
        user: (parent, args) => {
            return users.find(user = user.id === args.id);
        }
    }
}

module.exports = {typeDef, resolvers};