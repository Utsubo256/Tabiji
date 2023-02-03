import { useState } from 'react';
import {
  LoginCredentialsDTO,
  loginWithEmailAndPassword,
  SignupCredentialsDTO,
  signupWithEmailAndPassword,
} from '@/features/auth';

export function useAuth() {
  const [isSigningUp, setIsSigning] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function signup(data: SignupCredentialsDTO) {
    setIsSigning(true);
    const user = await signupWithEmailAndPassword(data);
    setIsSigning(false);
    return user;
  }

  async function login(data: LoginCredentialsDTO) {
    setIsLoggingIn(true);
    const user = await loginWithEmailAndPassword(data);
    console.log('user = ', user);
    setIsLoggingIn(false);
    return user;
  }

  return [{ signup, isSigningUp, login, isLoggingIn }];
}
