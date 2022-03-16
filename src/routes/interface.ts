import { ReactElement } from 'react';

export interface IBasePublicRoute {
  path: string;
  element: ReactElement;
  exact?: boolean;
}

export interface IPublicRoute {
  path: string;
  routes?: IBasePublicRoute[];
}

export declare type TPublicRoutes = (IBasePublicRoute | IPublicRoute)[];
