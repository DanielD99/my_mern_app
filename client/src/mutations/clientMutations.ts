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
mutation deleteClient($id: ID!){
    deleteClient(id: $id){
        id
        name
        email
        phone
    }
}`;

export { DELETE_CLIENT, CREATE_CLIENT };