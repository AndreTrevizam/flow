import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from './dto/login.input';
import { AuthService } from './auth.service';
import { AuthResponse } from './models/auth.login.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
