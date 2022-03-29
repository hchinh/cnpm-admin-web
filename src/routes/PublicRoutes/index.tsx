import LoginPage from 'containers/Login'
import { Route } from 'react-router-dom'

export const PUBLIC_ROUTES = [
  {
    path: '/login',
    component: LoginPage,
    exact: true,
  },
  {
    path: '/register',
    component: () => <div />,
    exact: true,
  },
  {
    path: '/forgot-password',
    component: () => <div />,
    exact: true,
  },
  {
    path: '/resetPassword',
    component: () => <div />,
    exact: true,
  },
]

const publicRoutes = () => PUBLIC_ROUTES.map((route) => <Route {...route} key={route.path} />)

export default publicRoutes
