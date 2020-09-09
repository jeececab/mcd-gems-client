import { gql } from 'apollo-boost';

export const ME = gql`
  query {
    me {
      name
      avatar
      email
      drills {
        title
        description
      }
    }
  }
`;
