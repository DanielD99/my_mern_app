import express from 'express';
const colors = require('colors');
const cors = require('cors');
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema/schema';
require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

const app = express();

//connect to db
connectDB();

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
