import { gql } from 'apollo-boost';

export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $password: String!, $email: String!) {
    registerUser(name: $name, password: $password, email: $email) {
      user {
        name
        email
      }
      error
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      user {
        name
        email
      }
      error
    }
  }
`;
