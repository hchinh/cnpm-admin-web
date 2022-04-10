import { PlusOutlined } from '@ant-design/icons'
import { FC } from 'react'
import CustomButton from '../CustomButton'

interface CreateButtonProps {
  title?: string
  handleClick: () => void
}

const CreateButton: FC<CreateButtonProps> = ({ title = 'Create', handleClick }) => {
  return (
    <CustomButton
      title={title}
      handleClick={handleClick}
      buttonProps={{
        icon: <PlusOutlined />,
        type: 'primary',
      }}
    />
  )
}

export default CreateButton
