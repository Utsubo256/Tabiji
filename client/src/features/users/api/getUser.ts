import { useEffect, useState } from 'react';
// import { useQuery } from 'react-query';

import { ApiClient } from '@/lib/apiClient';
// import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { User } from '../types';

export function getUser({
  userId,
}: {
  userId: string | undefined;
}): Promise<User> {
  return ApiClient.get(`/users/${userId}`);
}

export function useUser({ userId }: { userId: string | undefined }) {
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    introduction: null,
    createdAt: null,
    updatedAt: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    const result = await getUser({ userId });
    setUser(result);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return [{ user, isLoading }];
}

// type QueryFnType = typeof getUser;

// type UseUserOptions = {
//   userId: string | undefined;
//   config?: QueryConfig<QueryFnType>;
// };

// export function useUser({ userId, config }: UseUserOptions) {
//   return useQuery<ExtractFnReturnType<QueryFnType>>({
//     ...config,
//     queryKey: ['user', userId],
//     queryFn: () => getUser({ userId }),
//   });
// }
