import * as React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { queryClient } from '@/lib/react-query';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <React.Suspense>
      <QueryClientProvider client={queryClient}>
        {import.meta.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
        <ChakraProvider>
          <Router>{children}</Router>
        </ChakraProvider>
      </QueryClientProvider>
    </React.Suspense>
  );
}
