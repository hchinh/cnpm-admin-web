import { FC } from 'react'

export interface IBasePrivateRoute {
  path: string
  Component: FC
  exact?: boolean
  title?: string
}

export interface IPrivateRoute {
  path: string
  routes?: IBasePrivateRoute[]
  title?: string
}

export declare type TPrivateRoutes = (IBasePrivateRoute | IPrivateRoute)[]
