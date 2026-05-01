import type { UserAccess } from '@/constants/userAccess';

export type LoginResponse = {
  jwt: string;
  userName: string;
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
  roleName: string;
  userAccess: UserAccess[];
};
