
//const { projects, clients, } = require('../sampleData.ts');

// Mongoose models
 const Project = require('../models/Project.ts');
 const Client = require('../models/Client.ts');



const { GraphQLObjectType,
     GraphQLID,
      GraphQLString,
       GraphQLSchema,
        GraphQLList,
        GraphQLNonNull
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
    async resolve(parent: any, args: any) {
      console.log("REACHED")
      let project = await Project.findById(args.id)
      return project

      
    }, 
  },
    clients: {
        type: new GraphQLList(ClientType),
        resolve(parent: any, args: any) {
           return Client.find();
            
    },
},
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: any) {
      
        return Client.findById(args.id);
        
      },
    },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields:{
    //add client
    addClient:{
      type: ClientType,
      args:{
        name: { type : GraphQLNonNull(GraphQLString) },
        email: { type : GraphQLNonNull(GraphQLString) },
        phone: { type : GraphQLNonNull(GraphQLString) },
      },
      resolve(parent:any, args:any){
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
        return client.save();
      },
    },
    //delete client
    deleteClient:{
      type: ClientType,
      args:{
        id: { type : GraphQLNonNull(GraphQLID) },
  },
  async resolve(parent:any, args:any) {
    // check if user exists on any projects - if true then delete this relation and update the project - else simply delete the client
    let projects = await Project.find({clientId: args.id})
    if(!projects) {
      
   }
   return await Client.findByIdAndRemove(args.id);
  },
  },
},
});
