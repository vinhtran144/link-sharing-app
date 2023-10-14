import gql from 'graphql-tag';

export const CHECK_EMAIL_VALID = gql`
mutation checkEmail($email: String!) {
    checkEmail(email:$email)
  }
`;

export const CHECK_URL = gql`
mutation checkCustomURL($devlinkURL: String!) {
    checkCustomURL(devlinkURL:$devlinkURL)
  }
`;

export const UPDATE_USER = gql`
mutation updateUser($email: String, $devlinkURL: String, $firstName: String, $lastName: String) {
    updateUser(email:$email, devlinkURL:$devlinkURL, firstName:$firstName, lastName:$lastName){
        email
        firstName
        lastName
        devlinkURL
    }
  }
`