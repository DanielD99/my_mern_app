import Client from "../models/Client.model";
import Project from "../models/Project.model";
import Experience from "../models/Experience.model";
import mongoose from "mongoose";

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
      try{
      return await Client.find({});
      } catch (error) {
        console.error(error);
        throw new Error("Error retrieving all clients");
      }
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
      try{
      return await Project.find({});
      } catch (error) {
        console.error(error);
        throw new Error("Error retrieving all projects");
      }
    },
  },

  Mutation: {
    createProject: async (_parent: any, args: any, _context: any, _info: any) => {
      const { name, description, status, clientIds } = args.project;
      try {
        const newProject = await Project.create({
          name,
          description,
          status,
          clients: clientIds,
        });
        return {id:newProject._id, name, description, status, clients: clientIds};
      } catch (error) {
        console.error(error);
        throw new Error("Error creating project");
      }
    },

    createClient: async (parent: any, args: any, _context: any, info: any) => {
      const { name, email, phone } = args.client;
    try{
      const newClient = await Client.create({
         name,
         email,
         phone
        });
      return {id:newClient._id, name, email, phone};
      } catch (error) {
        console.error(error);
        throw new Error("Error creating client");
      }
    },

    addClientToProject: async (_parent: any, args: any, _context: any, _info: any) => {
      const { clientId, projectId } = args;
      try {
        const project = await Project.findById(projectId);  
        if (!project) {
          throw new Error("Project not found!");
        }

      //check if client already exists in project
      const clientExists = project.clients.find((client: any) => client == clientId);
      if (clientExists) {
        throw new Error("Client already added to project!");
      }
      const client = await Client.findById(clientId);
      if (!client) {
        throw new Error("Client not found!");
      }
        project.clients.push(clientId);
        await project.save()
        
        const populatedProject = await Project.findById(projectId).populate("clients");

        return populatedProject;
      } catch (error) {
        console.error(error);
        throw new Error("Error adding client to project");
      }
  },
    deleteClient: async (parent: any, args: any, context: any, info: any) => {
        const id = args.id
        try {
           const clientId = await Client.findByIdAndDelete(id)
           if (!clientId) {
             throw new Error("Client not found!")
           }
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