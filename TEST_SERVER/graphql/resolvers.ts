import Client from "../models/Client.model";
import Project from "../models/Project.model";

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World!";
    },
    getAllClients: async () => {
      return await Client.find({});
    },
    getAllProjects: async (_parent: any, args: any, _context: any, _info: any) => {
      return await Project.find({});
    },
  },
  Mutation: {
    createClient: async (parent: any, args: any, context: any, info: any) => {
    //   const { title, description } = args.post;
    //   const post = new Post({ title, description });
    //   await post.save();
    //   return post;
    },
    deleteClient: async (parent: any, args: any, context: any, info: any) => {
        const id = args.id
        try {
          await Client.findByIdAndDelete(id)
          return `Succesfully deleted client with id ${id}`;
        } catch (error) {
          return "Something went wrong!"
        }
    },
    deleteProject: async (_parent: any, args: any, _context: any, _info: any) => {
      const id = args.id;
      await Project.findByIdAndDelete(id);
      return `Ok - post with id ${id} was successfully deleted`;
    },
  },
};

export default resolvers;