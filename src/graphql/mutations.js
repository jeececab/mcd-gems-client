import { gql } from 'apollo-boost';

export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $username: String!, $password: String!, $email: String!) {
    registerUser(name: $name, username: $username, password: $password, email: $email) {
      name
      username
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      name
      username
      email
      avatar
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

export const UPLOAD_AVATAR = gql`
  mutation uploadAvatar($file: Upload!) {
    uploadAvatar(file: $file) {
      name
      username
      email
      avatar
    }
  }
`;
