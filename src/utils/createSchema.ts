import { buildSchema } from "type-graphql";
import { ToDoResolver } from "../modules/todo/ToDoResolver";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      ToDoResolver
    ]
  });
