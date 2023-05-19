
//import { GraphQLSchema, } from "graphql";
const { projects, clients, Project, Client } = require('../sampleData.ts');
const { GraphQLObjectType,
     GraphQLID,
      GraphQLString,
       GraphQLSchema,
        GraphQLList
    } = require('graphql');

// Client type
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    clients: {
        type: new GraphQLList(ClientType),
        resolve(parent: any, args: any) {
            return clients;
    }
},
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: any) {
        // code to get data from db / other source - sample data for now
        return clients.find((client: any) => client.id === args.id);
        
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query: RootQuery
});
