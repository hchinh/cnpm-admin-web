import { Route } from 'react-router-dom';
import { TPublicRoutes } from 'routes/interface';

export const PUBLIC_ROUTES: TPublicRoutes = [
  {
    path: '/',
    element: <div>Home</div>,
    exact: true,
  },
  {
    path: '/login',
    element: <div>Login</div>,
    exact: true,
  },
  {
    path: '/register',
    element: <div>Register</div>,
    exact: true,
  },
];

const publicRoutes = () => PUBLIC_ROUTES.map((route) => <Route {...route} key={route.path} />);

export default publicRoutes;
