import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { GqlContext } from '../interfaces/interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const headers = ctx.getContext<GqlContext>().req.headers;

    if (!headers.authorization) {
      throw new UnauthorizedException();
    }

    const fullToken = headers.authorization.split(' ');
    const token = fullToken[1];

    try {
      this.jwtService.verify(token);
    } catch (error) {
      console.warn(error);
      throw new UnauthorizedException();
    }

    return true;
  }
}
