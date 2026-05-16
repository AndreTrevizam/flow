import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../decorators/roles.decorator';
import { Reflector } from '@nestjs/core';
import { GqlContext, JwtPayload } from '../interfaces/interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const roles = this.reflector.get(Roles, context.getHandler());
    console.log(roles);
    const headers = ctx.getContext<GqlContext>().req.headers;

    if (!headers.authorization) {
      throw new UnauthorizedException();
    }

    const fullToken = headers.authorization.split(' ');
    const token = fullToken[1];

    try {
      const decoded = this.jwtService.verify<JwtPayload>(token);

      if (roles.includes(decoded.role)) {
        return true;
      }
    } catch (error) {
      console.warn(error);
      throw new UnauthorizedException();
    }

    return false;
  }
}
