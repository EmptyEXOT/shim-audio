export interface JwtPayload {
  sub: number; // здесь хранится ID юзера
  email: string;
  // roles: Array<string>; // здесь хранятся роли
}
