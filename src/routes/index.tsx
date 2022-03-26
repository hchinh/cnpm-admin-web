import NotFoundPage from 'containers/404Page'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import publicRoutes from './PublicRoutes'

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/404' component={NotFoundPage} />
          {publicRoutes()}
          <PrivateRoutes />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default React.memo(AppRoutes)
