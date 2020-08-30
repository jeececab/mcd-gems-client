import { gql } from 'apollo-boost';

export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $password: String!, $email: String!) {
    registerUser(name: $name, password: $password, email: $email) {
      user {
        id
        name
        email
      }
      error
    }
  }
`;
