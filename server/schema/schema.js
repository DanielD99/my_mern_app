"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
//import { GraphQLSchema, } from "graphql";
const { projects, clients, Project, Client } = require('../sampleData.ts');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql');
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
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return clients;
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source - sample data for now
                return clients.find((client) => client.id === args.id);
            }
        }
    }
});
exports.schema = new GraphQLSchema({
    query: RootQuery
});
