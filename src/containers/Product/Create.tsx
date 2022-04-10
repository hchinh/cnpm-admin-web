import DrawerCustom from 'components/common/DrawerCustom'
import { DrawerCustomProps } from 'interfaces'
import { FC } from 'react'
import ProductForm from './components/Form'

const CreateProductModal: FC<DrawerCustomProps> = ({
  title = 'CREATE NEW PRODUCT',
  onClose,
  visible,
  onOk,
  okText,
  okButtonProps,
}) => {
  return (
    <DrawerCustom title={title} onClose={onClose} visible={visible} onOk={onOk}>
      <ProductForm />
    </DrawerCustom>
  )
}

export default CreateProductModal
