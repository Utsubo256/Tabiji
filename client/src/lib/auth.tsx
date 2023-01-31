import { initReactQueryAuth } from 'react-query-auth';

import {
  loginWithEmailAndPassword,
  signupWithEmailAndPassword,
  LoginCredentialsDTO,
  SignupCredentialsDTO,
  AuthUser,
} from '@/features/auth';

async function loadUser() {
  return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  const user = await loginWithEmailAndPassword(data);
  return user;
}

async function registerFn(data: SignupCredentialsDTO) {
  const user = await signupWithEmailAndPassword(data);
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
  SignupCredentialsDTO
>(authConfig);
