import { ButtonProps } from 'antd'

export interface ICustomButtonBase {
  title: string
  buttonProps?: ButtonProps
}

export interface ICustomButton extends ICustomButtonBase {
  handleClick: () => void
}

export interface IFallbackCustomButton extends ICustomButtonBase {
  limitKey?: string
}
