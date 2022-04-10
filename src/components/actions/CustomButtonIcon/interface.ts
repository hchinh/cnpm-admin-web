import { ButtonProps } from 'antd';
import { ReactNode } from 'react';

export interface ICustomButtonIconBase {
  title?: string;
  buttonProps?: ButtonProps;
  icon?: ReactNode;
}

export interface ICustomButtonIcon extends ICustomButtonIconBase {
  handleClick: () => void;
}
