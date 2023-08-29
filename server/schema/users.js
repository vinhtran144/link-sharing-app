const {User, Link}  = require('../model');

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
        // user: (parent, args) => {
        //     return users.find(user = user.id === args.id);
        // }

        // query that takes a User's id in the context fields
        // will implement passport to handle the context
        me: async (parent, args, context) => {
            console.log(context);
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        }
    }
}

module.exports = {typeDef, resolvers};