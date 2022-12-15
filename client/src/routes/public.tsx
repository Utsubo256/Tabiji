import { Register } from '@/features/auth/routes/Register';
import { Profile } from '@/features/users/routes/Profile';

export const publicRoutes = [
  { path: '/signup', element: <Register />},
  { path: '/users/:userId', element: <Profile />}
];
