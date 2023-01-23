import { ApiClient } from '@/lib/apiClient';

import { AuthUser } from '../types';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export function loginWithEmailAndPassword(
  data: LoginCredentialsDTO
): Promise<AuthUser> {
  return ApiClient.post('/auth_token', data);
}
