import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import { formatArgumentValidationError } from "type-graphql";
import { createConnection } from "typeorm";
import { createSchema } from "./utils/createSchema";
import dotenv from 'dotenv'
dotenv.config()

const main = async () => {
  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req, res }: any) => ({
      req,
      res
    })
  });

  const app = Express();
  const { PORT } = process.env
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}/graphql`);
  });
};

main().catch(err => console.error(err));
