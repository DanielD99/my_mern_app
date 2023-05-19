"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema/schema");
(0, dotenv_1.config)();
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.schema,
    graphiql: process.env.NODE_ENV === 'development',
}));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});