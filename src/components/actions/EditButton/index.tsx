import { EditOutlined } from '@ant-design/icons'
import { FC } from 'react'
import CustomButtonIcon from '../CustomButtonIcon'

interface EditButtonProps {
  title?: string
  handleClick: () => void
}

const EditButton: FC<EditButtonProps> = ({ title = 'Edit', handleClick }) => {
  return (
    <CustomButtonIcon
      className='edit-button-icon-wrapper'
      title={title}
      handleClick={handleClick}
      icon={<EditOutlined />}
    />
  )
}

export default EditButton
