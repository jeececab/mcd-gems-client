import { gql } from 'apollo-boost';

export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $password: String!, $email: String!) {
    registerUser(name: $name, password: $password, email: $email) {
      name
      email
      avatar
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      name
      email
      avatar
    }
  }
`;

export const UPLOAD_AVATAR = gql`
  mutation uploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      name
      email
      avatar
    }
  }
`;
