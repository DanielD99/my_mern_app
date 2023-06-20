import Client from "../models/Client.model";
import Project from "../models/Project.model";

const resolvers = {
  Query:{
    getClient: async (_parent: any, args: { id: string }, _context: any, _info: any) => {
      const { id } = args;
      try {
        const client = await Client.findById(id);
        return client;
      } catch (error) {
        console.error(error);
        throw new Error("Error retrieving client by ID");
      }
    },
    getAllClients: async () => {
      return await Client.find({});
    },
    getProject: async (_parent: any, args: { id: string }, _context: any, _info: any) => {
      const { id } = args;
      try {
        const project = await Project.findById(id);
        return project;
      } catch (error) {
        console.error(error);
        throw new Error("Error retrieving project by ID");
      }
    },
    getAllProjects: async (_parent: any, args: any, _context: any, _info: any) => {
      return await Project.find({});
    },
  },
  Mutation: {
    createProject: async (_parent: any, args: any, _context: any, _info: any) => {
      const { name, description, status, clientIds } = args.project;
      try {
        const project = new Project({
          name,
          description,
          status,
          clients: clientIds,
        });
        // Save the project in the database
        const createdProject = await project.save();
        return createdProject;
      } catch (error) {
        console.error(error);
        throw new Error("Error creating project");
      }
    },
    createClient: async (parent: any, args: any, context: any, info: any) => {
      const { name, email, phone } = args.client;
      const client = new Client({ name, email, phone });
      await client.save();
      return client;
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