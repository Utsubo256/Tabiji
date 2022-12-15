import { ApiClient } from '@/lib/apiClient';

import { AuthUser } from '../types';

export type RegisterCredentialsDTO = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export function registerWithEmailAndPassword(
  data: RegisterCredentialsDTO
): Promise<AuthUser> {
  return ApiClient.post('/signup', data);
}
