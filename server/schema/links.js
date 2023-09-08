const { GraphQLError } = require('graphql');
const {User, Link}  = require('../model');

const typeDef = `
    extend type Query {
        link(id: String!): Link
    }

    type Link {
        _id: ID
        platform: String
        textURL: String
    }

    type Mutation {
        addLink(platform: String!, textURL: String!): User
        updateLink(linkID: ID!, platform: String, textURL: String): User
        deleteLink(linkID: ID!): User
    }
`;

const resolvers ={
    Mutation: {
        addLink: async (parent, args, context) => {
            if (context.req.user) {
                const newLink = await Link.create(args);
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.req.user._id.valueOf() },
                    { $push: {links: newLink._id}},
                    { new: true }
                ).populate('links');
                return updatedUser;
            }
            else   
                throw new GraphQLError("You' are not authenticated",{
                    extensions: {code: "401"}
                })
        },
        updateLink: async (parent, {linkID, platform, textURL}, context) => {
            if (context.req.user) {
                await Link.findOneAndUpdate(
                    {_id: linkID},
                    { platform,textURL}
                );
                const updatedUser = await User.findById(
                    { _id: context.req.user._id.valueOf() }
                ).populate('links');
                return updatedUser;
            }
            else   
                throw new GraphQLError("You are not authenticated",{
                    extensions: {code: "401"}
                })
        },
        deleteLink: async (parent, {linkID}, context) => {
            if (context.req.user) {
                await Link.findOneAndDelete(
                    { _id: linkID }
                );
                const updatedUser = await User.findById(
                    { _id: context.req.user._id.valueOf() }
                ).populate('links');
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