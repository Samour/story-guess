export interface UserToken {
  sub: string;
  loginId: string;
  sessionId: string;
  permissions: string[];
  iat: Date;
  exp: Date;
}
