import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Task } from 'src/tasks/entities/task.entity';

@ObjectType()
export class Column {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  position: number;

  @Field()
  boardId: string;

  @Field(() => [Task])
  tasks: Task[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
