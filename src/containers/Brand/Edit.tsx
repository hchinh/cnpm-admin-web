import { Form, notification, Spin } from 'antd'
import brandApi from 'api/brandApi'
import DrawerCustom from 'components/common/DrawerCustom'
import { FormContextCustom } from 'components/context/FormContextCustom'
import { Brand, DrawerCustomProps } from 'interfaces'
import { isEmpty } from 'lodash'
import { FC, useEffect, useState } from 'react'
import BrandForm from './components/Form'

interface Props extends DrawerCustomProps {
  refetch: () => void
  closeModal: () => void
}

const EditBrandModal: FC<Props> = ({
  refetch,
  id,
  resource,
  title = 'EDIT BRAND',
  closeModal,
  visible,
}) => {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const brand: Brand = resource?.find((item: Brand) => item.id === id)

  useEffect(() => {
    form.setFieldsValue({
      name: brand?.name,
      description: brand?.description,
    })
  }, [form, brand])

  const onOk = async () => {
    setLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const formValues = {
          ...values,
          id: brand?.id,
        }
        return await brandApi.update(formValues)
      })
      .then(async () => {
        setLoading(false)
        closeModal()
        form.resetFields()
        refetch()
      })
      .catch((info) => {
        setLoading(false)
        notification.error({ message: info.message })
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
          <FormContextCustom.Provider value={{ form, record: brand }}>
            {isEmpty(brand) ? (
              <div className='flex-center'>
                <Spin />
              </div>
            ) : (
              <BrandForm />
            )}
          </FormContextCustom.Provider>
        </Form>
      </DrawerCustom>
    </div>
  )
}

export default EditBrandModal
