export interface GqlContext {
  req: Request & {
    headers: {
      authorization?: string;
    };
  };
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}
