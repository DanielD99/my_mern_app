import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Client {
    id: ID!
    name: String
    email: String
    phone: String
  }

  type Project {
    id: ID!
    name: String
    description: String
    status: String
  }

  type Query {
    hello: String
    getAllClients: [Client]
    getAllProjects: [Project]
  }

  input ClientInput {
    title: String
    description: String
  }

  type Mutation {
    createClient(client: ClientInput): Client
    deleteClient(id: ID): String
    deleteProject(id: ID): String
  }
`;

export default typeDefs;