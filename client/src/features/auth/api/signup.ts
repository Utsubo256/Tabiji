import { ApiClient } from '@/lib/apiClient';

import { AuthUser } from '../types';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
};

export function signupWithEmailAndPassword(
  data: RegisterCredentialsDTO
): Promise<AuthUser> {
  return ApiClient.post('/signup', data);
}
