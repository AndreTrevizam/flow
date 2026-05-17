import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field()
  position: number;

  @Field()
  userId: string;

  @Field()
  columnId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
