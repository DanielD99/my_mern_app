import mongoose from "mongoose";


interface Client{
    id: string;
    name: string;
    email: string;
    phone: string;
    }
    
    
    type Clients = {
      id: string;
      name: string;
      email: string;
      phone: string;
    };
    
    export type { Client, Clients};