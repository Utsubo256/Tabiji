import { initReactQueryAuth } from 'react-query-auth';

import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  AuthUser,
} from '@/features/auth';

async function loadUser() {
  return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  const user = await loginWithEmailAndPassword(data);
  return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const user = await registerWithEmailAndPassword(data);
  return user;
}

async function logoutFn() {
  return null;
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return <div>Loading...</div>;
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
