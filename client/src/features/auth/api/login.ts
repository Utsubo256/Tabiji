import { ApiClient } from '@/lib/apiClient';

import { LoginResponse } from '../types';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export function loginWithEmailAndPassword(
  data: LoginCredentialsDTO
): Promise<LoginResponse> {
  return ApiClient.post('/auth_token', data);
}
