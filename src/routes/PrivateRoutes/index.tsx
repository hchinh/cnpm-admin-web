import BrandList from 'containers/Brand/List'
import CategoryList from 'containers/Category/List'
import CustomerList from 'containers/Customer/List'
import EmployeeList from 'containers/Employee/List'
import ProductList from 'containers/Product/List'
import PrivateLayout from 'layouts/PrivateLayout'
import { flatMap, map } from 'lodash'
import { Redirect, Switch } from 'react-router-dom'
import { IBasePrivateRoute, IPrivateRoute, TPrivateRoutes } from 'routes/interface'
import PrivateRoute from './PrivateRoute'

const routes: TPrivateRoutes = [
  {
    path: '/',
    Component: () => <div>Dashboard</div>,
    exact: true,
    title: 'Dashboard',
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
