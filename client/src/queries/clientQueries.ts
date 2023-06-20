import { gql } from '@apollo/client';
const GET_CLIENTS = gql`
query GetAllClients{
    getAllClients {
        id
        name
        email
        phone
      }
    }
`;

export { GET_CLIENTS};