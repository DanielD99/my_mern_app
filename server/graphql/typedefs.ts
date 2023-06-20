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
    clients: [Client]
  }

  type Query {
    getAllClients: [Client]
    getAllProjects: [Project]
    getClient(id: String!): Client
    getProject(id: String!): Project
  }

  input ClientInput {
    name: String
    email: String
    phone: String
  }

  input ProjectInput {
    name: String
    description: String
    status: String
    clientIds: [ID]
  }
  
  type Mutation {
    createClient(client: ClientInput): Client
    createProject(project: ProjectInput): Project
    deleteClient(id: ID): String
    deleteProject(id: ID): String
  }
`;

export default typeDefs;