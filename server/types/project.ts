
import mongoose, { Document } from "mongoose"
import { Client } from "./client";

interface Project extends Document{
    id: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
    status: string;
    clients: Client[];
    }
    
    type Projects = {
      id: mongoose.Schema.Types.ObjectId;
      name: string;
      description: string;
      status: string;
      clients: Client[];
    };
    export type { Project, Projects};