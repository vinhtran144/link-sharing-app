const {User, Link}  = require('../model');

const typeDef = `
    extend type Query {
        me: User
    }

    type User {
        id: String!
        name: String!
        linkIDs: [String]
        devLinkURL: String!
    }

    type Mutation {
        addUser(username:String!, password:String!): User
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
            console.log(context.req.session);
        }
    },
    Mutation: {
        addUser: async (parent, args, context) => {
            console.log(context);
            const user = await User.create(args);
            return user;
        }
    }
}

module.exports = {typeDef, resolvers};