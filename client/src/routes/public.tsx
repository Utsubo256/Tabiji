import { Signup } from '@/features/auth/routes/Signup';
import { Login } from '@/features/auth/routes/Login';
import { Profile } from '@/features/users/routes/Profile';

export const publicRoutes = [
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Login /> },
  { path: '/users/:userId', element: <Profile /> }
];
