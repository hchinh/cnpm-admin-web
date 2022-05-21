import { FC } from 'react'
import { Tooltip } from 'antd'
import { NoteWrapper } from './styles'
import { BookOutlined } from '@ant-design/icons'

interface Props {
  title?: string
}

const NoteButton: FC<Props> = ({ title }) => {
  return (
    <NoteWrapper>
      <Tooltip placement='left' title={title ? title : false}>
        <BookOutlined />
      </Tooltip>
    </NoteWrapper>
  )
}

export default NoteButton
