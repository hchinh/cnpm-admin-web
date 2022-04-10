import { ButtonProps, DrawerProps } from 'antd'
import { ReactNode } from 'react'

export interface DrawerContentProps {
  onOk?: (e: React.MouseEvent<HTMLElement>) => void
  onClose?: () => void
  closeModal?: () => void
  okButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  okText?: string
  title?: string
  footer?: ReactNode
}

export interface DrawerCustomProps
  extends Omit<DrawerProps, 'onClose' | 'title'>,
    DrawerContentProps {
  id?: string
  resource?: any
  extraResource?: any
}
