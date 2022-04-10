import { DrawerCustomProps } from 'interfaces'
import { FC } from 'react'
import DrawerContent from './DrawerContent'
import DrawerRoute from './DrawerRoute'

const DrawerCustom: FC<DrawerCustomProps> = ({
  children,
  onClose,
  onOk,
  okButtonProps,
  cancelButtonProps,
  okText,
  title,
  footer,
  ...props
}) => (
  <DrawerRoute onClose={onClose} {...props}>
    <DrawerContent
      title={title}
      onClose={onClose}
      onOk={onOk}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
      okText={okText}
      footer={footer}
    >
      {children}
    </DrawerContent>
  </DrawerRoute>
)

export default DrawerCustom
