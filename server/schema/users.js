const { GraphQLError } = require('graphql');
const {User, Link}  = require('../model');

const typeDef = `
    extend type Query {
        me: User
        getUser(devlinkURL: String!): User
        loginCheck: loginResponse
    }

    scalar File

    type loginResponse {
        isLoggedIn: Boolean
    }

    type User {
        email: String
        links: [Link]
        firstName: String
        lastName: String
        devlinkURL: String
        profilePic: String
    }

    type Mutation {
        checkEmail(email: String!): Boolean
        checkCustomURL(devlinkURL: String!): Boolean
        updateUser(email: String, devlinkURL: String, firstName: String, lastName: String ): User
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
            throw new GraphQLError("You're not authenticated",{
                extensions: {code: "401"}
            })
        },
        getUser: async (parent, {devlinkURL}) => {
            const user = await User.findOne({devlinkURL}).populate('links');
            if (user) {
                return user
            } else
                throw new GraphQLError("No user found",{
                    extensions: {code: "404"}
                })
        },
        loginCheck: (parent, args, context) => {
            const response = {isLoggedIn: false};
            if (context.req.user){
                // Simple check to see if the user is logged in
                response.isLoggedIn = true
            } 
            console.lo
            console.log(response);
            return response;
        }
    },
    Mutation: {
        checkEmail: async (parent, { email }, context) => {
            // return whether the email is valid, useful for new user registration
            const check = await User.findOne({email});
            if (check) return false;
            return true;
        },
        checkCustomURL: async (parent, { devlinkURL }, context) => {
            // return whether the URL is valid, used to let user know if their custom URL is available
            const check = await User.findOne({devlinkURL});
            if (check) return false;
            return true;
        },
        updateUser: async (parent, { email, devlinkURL, firstName, lastName}, context) => {
            if (email) {
                const check = await User.findOne({email});
                if (check) {
                    throw new GraphQLError("Email already existed",{
                        extensions: {code: "409"}
                    })
                }
            }
            if (devlinkURL) {
                const check = await User.findOne({devlinkURL});
                if (check) {
                    throw new GraphQLError("URL already existed",{
                        extensions: {code: "409"}
                    })
                }
            }
            if (context.req.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.req.user._id.valueOf()},
                    {   
                        email,
                        devlinkURL,
                        firstName,
                        lastName
                    },
                    { new: true }
                );
                return updatedUser;
            }
            else   
                throw new GraphQLError("You are not authenticated",{
                    extensions: {code: "401"}
                })
        }
    }
}

module.exports = {typeDef, resolvers};