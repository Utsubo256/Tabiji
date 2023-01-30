import { BaseEntity } from '@/types';

export type AuthUser = {
  name: string;
  email: string;
  introduction: string | null;
} & BaseEntity;

export type UserResponse = {
  user: AuthUser;
};

export type LoginResponse = {
  token: string;
  expires: Date;
  user: {
    id: number;
    name: string;
    sub: string;
  };
};
