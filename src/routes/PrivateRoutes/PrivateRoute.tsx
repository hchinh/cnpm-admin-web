import { FC } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { IBasePrivateRoute } from 'routes/interface'

interface Props extends IBasePrivateRoute {
  key: string
}

const PrivateRoute: FC<Props> = ({ Component, title, ...rest }) => {
  const isAuth = localStorage.getItem('token')

  return (
    <Route
      {...rest}
      render={(props) => (isAuth ? <Component /> : <Redirect to={{ pathname: '/login' }} />)}
    />
  )
}

export default PrivateRoute
