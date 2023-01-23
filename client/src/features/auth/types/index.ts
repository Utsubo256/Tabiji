export type AuthUser = {
  id: string;
  name: string;
  email: string;
  introduction: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserResponse = {
  user: AuthUser;
};

export type LoginResponse = {
  token: string;
  expires: Date;
  user:  {
    id: number;
    name: string;
    sub: string;
  }
}
