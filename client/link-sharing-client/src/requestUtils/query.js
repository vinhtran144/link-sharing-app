import gql from 'graphql-tag';

export const GET_USER = gql`
query getUser($devlinkURL: String!) {
    user(devlinkURL:$devlinkURL) {
        email
        links {
            platform
            textURL
        }
        firstName
        lastName
        devlinkURL
    }
  }
`;

export const QUERY_ME = gql`
{
    me {
        email
        links {
            platform
            textURL
        }
        firstName
        lastName
        devlinkURL
    }
}
`
