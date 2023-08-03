const {links} = require('../sampleData');

const typeDef = `
    extend type Query {
        link(id: String!): Link
    }

    type Link {
        id: String!
        platform: String!
        websiteURL: String!
    }
`;

const resolvers ={
    Query:{
        link: (parent, args) => {
            return links.find(link = link.id === args.id);
        }
    }
}

module.exports = {typeDef, resolvers};