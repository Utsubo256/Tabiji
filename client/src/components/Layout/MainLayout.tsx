import * as React from 'react';

type MainLayoutProps = {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <main>{children}</main>
  );
}
