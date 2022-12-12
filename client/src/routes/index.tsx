import { useRoutes } from 'react-router-dom';

import { MainLayout } from '@/components/Layout';
import { publicRoutes } from './public';

export function AppRoutes() {
  const routes = publicRoutes;

  const element = useRoutes([...routes]);

  return (
    <MainLayout>
      {element}
    </MainLayout>
  );
}
