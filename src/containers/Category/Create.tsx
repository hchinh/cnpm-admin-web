import { Form, notification } from 'antd'
import categoryApi from 'api/categoryApi'
import DrawerCustom from 'components/common/DrawerCustom'
import { FormContextCustom } from 'components/context/FormContextCustom'
import { DrawerCustomProps } from 'interfaces'
import { FC, useState } from 'react'
import CategoryForm from './components/Form'

interface Props extends DrawerCustomProps {
  refetch: () => void
  closeModal: () => void
}

const CreateCategoryModal: FC<Props> = ({
  title = 'CREATE NEW CATEGORY',
  refetch,
  visible,
  closeModal,
}) => {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const onOk = async () => {
    setLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        return await categoryApi.add({ ...values })
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
    <DrawerCustom
      title={title}
      onClose={closeModal}
      visible={visible}
      onOk={onOk}
      okButtonProps={{ loading: loading }}
    >
      <Form form={form} layout='vertical'>
        <FormContextCustom.Provider value={{ form }}>
          <CategoryForm />
        </FormContextCustom.Provider>
      </Form>
    </DrawerCustom>
  )
}

export default CreateCategoryModal
