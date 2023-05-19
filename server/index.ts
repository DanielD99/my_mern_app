import express from 'express';
import { config as dotenvConfig } from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema/schema';

dotenvConfig();

const port = process.env.PORT || 5000;
const app = express();

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
