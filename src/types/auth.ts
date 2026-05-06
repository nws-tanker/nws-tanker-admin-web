import type { UserAccess } from '@/constants/userAccess';

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user_name: string;
  email: string;
  userId: number;
  clusterId: number;
};

export type JwtPayload = {
  sub: string;
  user_access: UserAccess[];
  role_name: string;
  iat: number;
  exp: number;
  jti: string;
  iss: string;
};

export type AuthUser = {
  email: string;
  userName: string;
  roleName: string;
  userAccess: UserAccess[];
};

export type RefreshTokenResponse = {
  access_token: string;
  refresh_token: string;
};
