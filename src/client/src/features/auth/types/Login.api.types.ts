export interface LoginResponse {
  email: string;
  accessToken: string;
  sessionId: number;
  userId: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}
