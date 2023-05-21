"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const colors = require('colors');
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema/schema");
require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
//connect to db
connectDB();
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.schema,
    graphiql: process.env.NODE_ENV === 'development',
}));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=index.js.map