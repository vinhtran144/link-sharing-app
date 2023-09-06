const { GraphQLError } = require('graphql');
const {User, Link}  = require('../model');

const typeDef = `
    extend type Query {
        me: User
    }

    scalar File

    type User {
        username: String
        links: [Link]
        devlinkURL: String
        profilePic: String
    }

    type Mutation {
        checkCustomURL(devlinkURL: String!): Boolean
        updateURL(devlinkURL: String!): User
    }
`;

const resolvers ={
    Query:{
        // Query to get User's data
        me: async (parent, args, context) => {
            if (context.req.user){
                const userData = await User.findById({_id: context.req.user._id.valueOf()})
                .populate('links');
                return userData;
            }
            // If user haven't logged in
            return null;
        }
    },
    Mutation: {
        checkCustomURL: async (parent, { devlinkURL }, context) => {
            // return whether the URL existed, used to let user know if their custom URL is available
            const check = await User.findOne({devlinkURL});
            if (check) return true;
            return false;
        },
        updateURL: async (parent, { devlinkURL }, context) => {
            const check = await User.findOne({devlinkURL});
            if (check) {
                throw new GraphQLError("URL already existed",{
                    extensions: {code: "409"}
                })
            }
            if (context.req.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.req.user._id.valueOf()},
                    { devlinkURL },
                    { new: true }
                );
                return updatedUser;
            }
            else   
                throw new GraphQLError("You're not authenticated",{
                    extensions: {code: "401"}
                })
        }
    }
}

module.exports = {typeDef, resolvers};