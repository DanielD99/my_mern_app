
import mongoose from "mongoose";
import { Client } from "./client";

interface Project{
    id: mongoose.Schema.Types.ObjectId;
    clientId: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
    status: string;
    }
    
    type Projects = {
      id: mongoose.Schema.Types.ObjectId;
      clientId: mongoose.Schema.Types.ObjectId;
      name: string;
      description: string;
      status: string;
    };