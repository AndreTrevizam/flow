import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { Column } from 'src/columns/entities/column.entity';
import { User } from 'src/users/models/user.model';

@InputType()
export class CreateBoardInput {
  @Field()
  name: string;
}
