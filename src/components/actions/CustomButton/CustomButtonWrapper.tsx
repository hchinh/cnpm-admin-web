import { Button } from 'antd'
import { FC } from 'react'
import { ICustomButton } from './interface'

interface Props extends ICustomButton {}

const CustomButtonWrapper: FC<Props> = ({ title, buttonProps, handleClick }) => {
  return (
    <Button onClick={handleClick} {...buttonProps}>
      {title}
    </Button>
  )
}

export default CustomButtonWrapper
