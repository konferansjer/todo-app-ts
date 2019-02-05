import { Arg, Mutation, Query, Resolver, InputType, Field } from "type-graphql";
import { Todo } from "../../entity/ToDo";
import { ObjectID } from "mongodb";
import { ObjectIdScalar } from "../../scalars/ObjectId";


@InputType()
export class ToDoInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  completed: boolean;
}

@Resolver()
export class ToDoResolver {
  @Mutation(() => Todo)
  async addToDo(
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Arg("completed", { defaultValue: false }) completed?: boolean
  ): Promise<Todo> {
    return Todo.create({ title, content, completed }).save();
  }

  @Mutation(() => Boolean)
  async deleteToDo(@Arg("todoId", () => ObjectIdScalar) todoId: ObjectID): Promise<boolean> {
    await Todo.delete({ id: todoId });
    return true;
  }

  @Mutation(() => Todo)
  async updateToDo(
    @Arg("todoId", () => ObjectIdScalar) todoId: ObjectID,
    @Arg("input") input: ToDoInput
  ): Promise<Todo> {
    await Todo.update(todoId.toHexString(), input)
    let todo = await Todo.find({
      where: {
        _id: todoId
      }
    })
    return todo[0]
  }

  @Query(() => [Todo])
  async listToDos(): Promise<Todo[]> {
    return Todo.find();
  }

  @Query(() => Todo)
  async findToDoById(
    @Arg('todoId', () => ObjectIdScalar) todoId: ObjectID
  ): Promise<Todo> {
    let todo = await Todo.find({
      where: {
        _id: todoId
      }
    })
    return todo[0]
  }
}
