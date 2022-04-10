import { SyncOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import { FC } from 'react'
import { ICustomButtonIcon } from './interface'

interface Props extends ICustomButtonIcon {}

const ButtonIcon: FC<Props> = ({
  title = '',
  buttonProps,
  handleClick,
  icon = <SyncOutlined />,
}) => {
  return (
    <div>
      <Tooltip title={title}>
        <Button {...buttonProps} icon={icon} onClick={handleClick} />
      </Tooltip>
    </div>
  )
}

export default ButtonIcon
