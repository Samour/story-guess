export interface UserToken {
  sub: string;
  loginId: string;
  sessionId: string;
  iat: Date;
  exp: Date;
}
