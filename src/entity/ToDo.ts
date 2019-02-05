import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ObjectIdColumn
} from "typeorm";
import { ObjectID } from 'mongodb'
import { ObjectIdScalar } from "../scalars/ObjectId";

@ObjectType()
@Entity()
export class Todo extends BaseEntity {
  @Field(() => ObjectIdScalar)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  completed: boolean;
}
