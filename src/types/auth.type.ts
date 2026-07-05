export interface BaseResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  timestamp: string;
}

export type UserRole = "super_admin" | "admin" | "instructor" | "student";
export type UserStatus = "active" | "inactive" | "banned";

export interface AuthUser {
  id: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  avatarUrl?: string | null;
  emailVerifiedAt?: string | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  exp: number;
  iat: number;
}
