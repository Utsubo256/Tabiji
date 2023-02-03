import { useState } from 'react';
import {
  LoginCredentialsDTO,
  loginWithEmailAndPassword,
  SignupCredentialsDTO,
  signupWithEmailAndPassword,
} from '@/features/auth';
import { useRecoilState } from 'recoil';
import { authState } from './authState';

export function useAuth() {
  const [isSigningUp, setIsSigningIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);

  async function signup(data: SignupCredentialsDTO) {
    setIsSigningIn(true);
    const user = await signupWithEmailAndPassword(data);
    setIsSigningIn(false);
    return user;
  }

  async function login(data: LoginCredentialsDTO) {
    setIsLoggingIn(true);
    const accessToken = await loginWithEmailAndPassword(data);
    setAuth(accessToken)
    setIsLoggingIn(false);
  }

  return [{ signup, isSigningUp, login, isLoggingIn }];
}
