export interface RegisterUserRequest {
  loginId: string;
  displayName: string;
  password: string;
}

export interface RegisterUserResponse {
  id: string;
  loginId: string;
  displayName: string;
}
