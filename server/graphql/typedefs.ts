import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Client {
    id: ID!
    name: String
    email: String
    phone: String
    experiences: [Experience]
  }

  type Project {
    id: ID!
    name: String
    description: String
    status: String
    clients: [Client]
  }

  type Experience {
    id: ID!
    skillSet: String
    description: String
    level: String
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
  }

  input ExperienceInput {
    skillSet: String
    description: String
    level: String
  }

  
  type Query {
    getAllClients: [Client]
    getAllProjects: [Project]
    getClient(id: ID!): Client
    getProject(id: ID!): Project
  }
  
  type Mutation {
    addClientToProject(clientId: ID!, projectId: ID!): Project
    createClient(client: ClientInput): Client
    createProject(project: ProjectInput): Project
    deleteClient(id: ID): String
    deleteProject(id: ID): String
  }
`;

export default typeDefs;