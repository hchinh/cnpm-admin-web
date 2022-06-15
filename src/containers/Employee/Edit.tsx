import { Form, notification, Spin } from 'antd'
import employeeApi from 'api/employeeApi'
import DrawerCustom from 'components/common/DrawerCustom'
import { FormContextCustom } from 'components/context/FormContextCustom'
import { DrawerCustomProps, Employee } from 'interfaces'
import { isEmpty } from 'lodash'
import { FC, useEffect, useState } from 'react'
import EmployeeForm from './components/Form'

interface Props extends DrawerCustomProps {
  refetch: () => void
  closeModal: () => void
}

const EditEmployeeModal: FC<Props> = ({
  refetch,
  id,
  resource,
  title = 'EDIT EMPLOYEE',
  closeModal,
  visible,
}) => {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const employee: Employee = resource?.find((item: Employee) => item.id === id)

  useEffect(() => {
    form.setFieldsValue({
      userName: employee?.userName,
      name: employee?.name,
      phoneNumber: employee?.phoneNumber,
      address: employee?.address,
      email: employee?.email,
      gender: employee?.gender,
      roleCode: employee?.roleCode,
    })
  }, [form, employee])

  const onOk = async () => {
    setLoading(true)
    form
      .validateFields()
      .then(async (values) => {
        const formValues = {
          ...values,
          id: employee?.id,
        }
        return await employeeApi.update(formValues)
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
          <FormContextCustom.Provider value={{ form, record: employee }}>
            {isEmpty(employee) ? (
              <div className='flex-center'>
                <Spin />
              </div>
            ) : (
              <EmployeeForm isEdit />
            )}
          </FormContextCustom.Provider>
        </Form>
      </DrawerCustom>
    </div>
  )
}

export default EditEmployeeModal
