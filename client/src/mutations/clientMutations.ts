import {gql} from '@apollo/client';


const CREATE_CLIENT = gql`
mutation CreateClient($client: ClientInput) {
  createClient(client: $client) {
      id
      name
      email
      phone
    }
  }
`;


const DELETE_CLIENT = gql`
mutation DeleteClient($id: ID!) {
  deleteClient(id: $id)
}
`;

export { DELETE_CLIENT, CREATE_CLIENT };