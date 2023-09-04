const {User, Link}  = require('../model');
const { genSaltHash } = require('../utils/cryptoUtils');

const typeDef = `
    extend type Query {
        me: User
    }

    type User {
        _id: ID
        username: String
        links: [Link]
        devlinkURL: String
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
            console.log('Testing query');
            console.log(context.req.session);
            console.log(context.req.user);
        }
    },
    Mutation: {
        addUser: async (parent, {username, password}, context) => {
            const saltHash = genSaltHash(password);
            const newArgs = {
                username,
                ...saltHash
            };
            const user = await User.create(newArgs);
            return user;
        }
    }
}

module.exports = {typeDef, resolvers};