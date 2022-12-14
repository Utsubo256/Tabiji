import { useQuery } from 'react-query';

import { ApiClient } from '@/lib/apiClient';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { User } from '../types';

export function getUser(userId: number): Promise<User> {
  return ApiClient.get(`/users/${userId}`);
}

type QueryFnType = typeof getUser;

type UseUserOptions = {
  userId: number;
  config?: QueryConfig<QueryFnType>;
};

export function useUser({ userId, config }: UseUserOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
  });
}
