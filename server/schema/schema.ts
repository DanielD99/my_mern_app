
//const { projects, clients, } = require('../sampleData.ts');

// Mongoose models
 const Project = require('../models/Project.ts');
 const Client = require('../models/Client.ts');




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

// Project type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent: any, args: any) {
        return Client.findById(parent.clientId);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent: any, args: any) {
          return Project.find();
  },
},
  project: {
    type: ProjectType,
    args: { id: { type: GraphQLID } },
    resolve(parent: any, args: any) {
      // code to get data from db / other source - sample data for now
      return Project.findbyId(args.id);
      
    },
  },
    clients: {
        type: new GraphQLList(ClientType),
        resolve(parent: any, args: any) {
           Client.find();
            
    },
},
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: any) {
        // code to get data from db / other source - sample data for now
        return Client.findbyId(args.id);
        
      },
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery
});
