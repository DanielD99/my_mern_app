import express, { Application } from "express";
require("express-async-errors");
import typeDefs from "./graphql/typedefs";
import resolvers from "./graphql/resolvers";
import dotenv from "dotenv";
import cors from "cors"
import { ApolloServer, gql } from "apollo-server-express";
import mongoose from "mongoose";

dotenv.config();

const startServer = async () => {
    const app: Application = express();
  
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await apolloServer.start(); 
    apolloServer.applyMiddleware({ app, path: "/graphql" });
  
    app.use((_req, res) => {
      res.send("Hello from express apollo server!");
    });
  
    const URL = process.env.MONGO_URI || "";
    mongoose.set("strictQuery", false);
    console.log("connecting to db on: ", URL);
  
    await mongoose
      .connect(URL)
      .then(async () => {
        console.log("connected to MongoDB");
      })
      .catch((err: Error) => {
        console.log("error connecting to MongoDB:", err.message);
      });
    app.use(cors());
    app.use(express.json());
  
    app.listen(3000, (): void => {
      console.log(`⚡️[server]: Server is running at http://localhost:3000`);
    });
  };
  
startServer()