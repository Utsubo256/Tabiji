import { Profile } from '@/features/users/routes/Profile';

export const publicRoutes = [
  { path: '/users/:userId', element: <Profile />}
];
