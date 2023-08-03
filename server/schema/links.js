import {links} from '../sampleData';

export const typeDef = `
    extend type Query {
        link(id: String!): Link
    }

    type Link {
        id: String!
        platform: String!
        websiteURL: String!
    }
`;

export const resolvers ={
    Query:{
        link: (parent, args) => {
            return links.find(link = link.id === args.id);
        }
    }
}