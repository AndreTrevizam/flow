import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column } from 'src/columns/entities/column.entity';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Board {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [User])
  users: User[];

  @Field(() => [Column])
  columns: Column[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
