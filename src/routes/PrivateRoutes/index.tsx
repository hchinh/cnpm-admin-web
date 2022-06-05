import BrandList from 'containers/Brand/List'
import CategoryList from 'containers/Category/List'
import CustomerList from 'containers/Customer/List'
import DashboardPage from 'containers/Dashboard'
import EmployeeList from 'containers/Employee/List'
import OrderList from 'containers/Order/List'
import OrderDetail from 'containers/Order/Show'
import ProductList from 'containers/Product/List'
import Profile from 'containers/Profile/Show'
import PrivateLayout from 'layouts/PrivateLayout'
import { flatMap, map } from 'lodash'
import { Redirect, Switch } from 'react-router-dom'
import { IBasePrivateRoute, IPrivateRoute, TPrivateRoutes } from 'routes/interface'
import PrivateRoute from './PrivateRoute'

const routes: TPrivateRoutes = [
  {
    path: '/',
    Component: DashboardPage,
    exact: true,
    title: 'Dashboard',
  },
  {
    path: '/profile',
    Component: Profile,
    exact: true,
    title: 'Profile',
  },
  {
    path: '/products',
    Component: ProductList,
    exact: true,
    title: 'Products',
  },
  {
    path: '/categories',
    Component: CategoryList,
    exact: true,
    title: 'Categories',
  },
  {
    path: '/brands',
    Component: BrandList,
    exact: true,
    title: 'Brands',
  },
  {
    path: '/customers',
    Component: CustomerList,
    exact: true,
    title: 'Customers',
  },
  {
    path: '/employees',
    Component: EmployeeList,
    exact: true,
    title: 'Employees',
  },
  {
    path: '/orders',
    exact: true,
    routes: [
      {
        path: '/',
        Component: OrderList,
      },
      {
        path: '/:id/show',
        Component: OrderDetail,
      },
    ],
    title: 'Orders',
  },
]

const wrappedRoutes = map(
  flatMap(routes, (route: IPrivateRoute & IBasePrivateRoute) => {
    if (route.routes) {
      return map(route.routes, (subRoute) => ({
        exact: subRoute.path === '/',
        ...subRoute,
        path: route.path + subRoute.path,
        Component: subRoute.Component,
        title: subRoute.title || route.title,
      }))
    }
    return route
  }),
  (route: IBasePrivateRoute) => <PrivateRoute {...route} key={route.path} />
)

const PrivateRoutes = () => {
  return (
    <>
      <PrivateLayout>
        <Switch>
          {wrappedRoutes}
          <Redirect to={{ pathname: '/404' }} />
        </Switch>
      </PrivateLayout>
    </>
  )
}

export default PrivateRoutes
