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
