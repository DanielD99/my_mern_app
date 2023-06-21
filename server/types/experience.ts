
import mongoose from "mongoose";

interface Experience{
    id: mongoose.Schema.Types.ObjectId;
    skillSet: string;
    description: string;
    level: string;
    }
    
    type Experiences = {
      id: mongoose.Schema.Types.ObjectId;
      skillSet: string;
      description: string;
      level: string;
    };
    export type { Experience, Experiences};