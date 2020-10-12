import { gql } from 'apollo-boost';

export const ME = gql`
  query {
    me {
      name
      username
      avatar
      email
      bio
      drills {
        title
        description
      }
    }
  }
`;
