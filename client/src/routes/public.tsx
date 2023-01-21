import { Register } from '@/features/auth/routes/Register';
import { Login } from '@/features/auth/routes/Login';
import { Profile } from '@/features/users/routes/Profile';

export const publicRoutes = [
  { path: '/signup', element: <Register /> },
  { path: '/login', element: <Login /> },
  { path: '/users/:userId', element: <Profile /> }
];
