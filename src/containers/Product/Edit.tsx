import { Form, notification, Spin } from 'antd'
import productApi from 'api/productApi'
import DrawerCustom from 'components/common/DrawerCustom'
import { FormContextCustom } from 'components/context/FormContextCustom'
import { DrawerCustomProps, Product } from 'interfaces'
import { isEmpty } from 'lodash'
import { FC, useEffect, useState } from 'react'
import ProductForm from './components/Form'

interface Props extends DrawerCustomProps {
  refetch: () => void
  closeModal: () => void
}

const EditProductModal: FC<Props> = ({
  refetch,
  id,
  resource,
  extraResource,
  title = 'EDIT PRODUCT',
  closeModal,
  visible,
}) => {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const product: Product = resource?.find((item: Product) => item.id === id)

  useEffect(() => {
    form.setFieldsValue({
      name: product?.name,
      brand: product?.brand,
      categoryId: product?.categoryId,
      description: product?.description,
      price: product?.price,
      unitInStock: product?.unitInStock,
    })
  }, [form, product])

  const onOk = async () => {
    setLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const formValues = {
          ...values,
          id: product?.id,
        }
        return await productApi.update(formValues)
      })
      .then(async () => {
        setLoading(false)
        closeModal()
        refetch()
      })
      .catch((info) => {
        setLoading(false)
        notification.error(info.message)
      })
  }

  return (
    <div>
      <DrawerCustom
        title={title}
        onClose={closeModal}
        visible={visible}
        onOk={onOk}
        okButtonProps={{ loading: loading }}
      >
        <Form form={form} layout='vertical'>
          <FormContextCustom.Provider value={{ form, record: product }}>
            {isEmpty(product) ? (
              <div className='flex-center'>
                <Spin />
              </div>
            ) : (
              <ProductForm item={product} extraItem={extraResource} />
            )}
          </FormContextCustom.Provider>
        </Form>
      </DrawerCustom>
    </div>
  )
}

export default EditProductModal
