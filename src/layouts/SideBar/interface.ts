import { FC } from 'react'

export interface SidebarMenuItemProps {
  url: string
  IconCPN: FC
  key: string
  text: string
}

export interface MenuItemProps {
  disabled?: boolean
  menu: SidebarMenuItemProps
  active: boolean
}
