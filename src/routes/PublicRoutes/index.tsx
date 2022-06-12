import LoginPage from 'containers/Login'
import { Route } from 'react-router-dom'

export const PUBLIC_ROUTES = [
  {
    path: '/login',
    component: LoginPage,
    exact: true,
  },
]

const publicRoutes = () => PUBLIC_ROUTES.map((route) => <Route {...route} key={route.path} />)

export default publicRoutes
