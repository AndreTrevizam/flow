import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserRole } from 'generated/prisma/enums';

export { UserRole };

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Papel do usuário no sistema',
});

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  password: string;

  @Field(() => UserRole)
  role: UserRole;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
