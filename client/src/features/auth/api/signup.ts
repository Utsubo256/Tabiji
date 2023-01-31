import { ApiClient } from '@/lib/apiClient';

import { AuthUser } from '../types';

export type SignupCredentialsDTO = {
  email: string;
  password: string;
};

export function signupWithEmailAndPassword(
  data: SignupCredentialsDTO
): Promise<AuthUser> {
  return ApiClient.post('/signup', data);
}
