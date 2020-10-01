export interface CreateSessionRequest {
  loginId: string;
  password: string;
}

export interface CreateSessionResponse {
  sessionId: string;
  sessionSecret: string;
  token: string;
}

export interface RefreshTokenRequest {
  sessionId: string;
  sessionSecret: string;
}

export interface RefreshTokenResponse {
  token: string;
}
