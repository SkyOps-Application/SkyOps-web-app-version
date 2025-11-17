/**
 * User and authentication types
 */

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  lastLogin?: Date;
  profile?: UserProfile;
}

export type UserRole = 'ADMIN' | 'INSTRUCTOR' | 'TRAINEE';

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  organization?: string;
  certificationLevel?: string;
  avatar?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  email: string;
  firstName?: string;
  lastName?: string;
}

