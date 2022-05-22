import { IBreadcrumb } from 'interfaces'
import { ReactNode } from 'react'

export interface IRestShowLayout {
  resource: string
  customBreadcrumb?: IBreadcrumb[]
  extraAction?: ReactNode
  formatBreadcrumb?: (data: any) => IBreadcrumb[]
  showHeader?: boolean
  record: any
}
