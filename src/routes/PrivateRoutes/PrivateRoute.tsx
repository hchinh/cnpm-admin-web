import LaunchScreen from 'components/common/LaunchScreen'
import { FC } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IBasePrivateRoute } from 'routes/interface'

interface Props extends IBasePrivateRoute {
  key: string
}

const PrivateRoute: FC<Props> = ({ Component, title, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token')

  const loading = localStorage.getItem('loading')

  if (loading) return <Route component={LaunchScreen} />

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component /> : <Redirect to={{ pathname: '/login' }} />
      }
    />
  )
}

export default PrivateRoute
