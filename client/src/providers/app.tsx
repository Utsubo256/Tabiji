import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <RecoilRoot>
      <React.Suspense>
        <ChakraProvider>
          <Router>{children}</Router>
        </ChakraProvider>
      </React.Suspense>
    </RecoilRoot>
  );
}
