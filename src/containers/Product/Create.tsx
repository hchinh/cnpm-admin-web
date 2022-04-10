import { Form } from 'antd'
import productApi from 'api/productApi'
import DrawerCustom from 'components/common/DrawerCustom'
import { FormContextCustom } from 'components/context/FormContextCustom'
import { DrawerCustomProps } from 'interfaces'
import { FC, useState } from 'react'
import ProductForm from './components/Form'

interface Props extends DrawerCustomProps {
  refetch: () => void
  closeModal: () => void
}

const CreateProductModal: FC<Props> = ({
  title = 'CREATE NEW PRODUCT',
  refetch,
  visible,
  closeModal,
  extraResource,
}) => {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const onOk = async () => {
    setLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        return await productApi.add({ ...values })
      })
      .then(async () => {
        setLoading(false)
        closeModal()
        form.resetFields()
        refetch()
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  return (
    <Form form={form} layout='vertical'>
      <FormContextCustom.Provider value={{ form }}>
        <DrawerCustom
          title={title}
          onClose={closeModal}
          visible={visible}
          onOk={onOk}
          okButtonProps={{ loading: loading }}
        >
          <ProductForm extraItem={extraResource} />
        </DrawerCustom>
      </FormContextCustom.Provider>
    </Form>
  )
}

export default CreateProductModal
