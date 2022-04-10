import { Space } from 'antd'
import { FC } from 'react'
import GroupActionsStyles from './styles'

interface Props {
  align?: 'center' | 'left' | 'right'
}

const GroupActions: FC<Props> = ({ children, align = 'center' }) => {
  return (
    <GroupActionsStyles className={`group-action__${align}`}>
      <Space size={5}>{children}</Space>
    </GroupActionsStyles>
  )
}

export default GroupActions
