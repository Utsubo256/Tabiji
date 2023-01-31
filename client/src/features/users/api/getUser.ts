import { useState, useEffect } from 'react';

import { ApiClient } from '@/lib/apiClient';
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
