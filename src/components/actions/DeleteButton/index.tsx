import { DeleteOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { IDeleteButton } from 'interfaces'
import { FC } from 'react'
import CustomButtonIcon from '../CustomButtonIcon'

const DeleteButton: FC<IDeleteButton> = ({
  title = 'Delete',
  deleteItem,
  customTitle,
  customMessage,
}) => {
  const handleDelete = () =>
    Modal.confirm({
      title: `Delete ${customTitle}`,
      content: customMessage ?? 'Are you sure to delete?',
      okText: 'OK',
      cancelText: 'Cancel',
      zIndex: 100000,
      onOk: () => {
        return deleteItem()
      },
    })

  return (
    <CustomButtonIcon
      className='delete-button-icon-wrapper'
      title={title}
      handleClick={handleDelete}
      icon={<DeleteOutlined />}
      buttonProps={{
        danger: true,
      }}
    />
  )
}

export default DeleteButton
