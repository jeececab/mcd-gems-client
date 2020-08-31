import { gql } from 'apollo-boost';

export const ME = gql`
  query {
    me {
      user {
        name
      }
      error
    }
  }
`;
