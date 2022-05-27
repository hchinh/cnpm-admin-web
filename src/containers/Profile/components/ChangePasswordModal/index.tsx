import { Form, notification } from 'antd'
import authApi from 'api/authApi'
import ModalCustom from 'components/common/ModalCustom'
import { ModalForwardRefHandle } from 'interfaces/modal'
import React, { useImperativeHandle, useState } from 'react'
import FormChangePassword from './FormChangePassword'

const ChangePasswordModal: React.ForwardRefRenderFunction<ModalForwardRefHandle, unknown> = (
  props,
  ref
) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState<boolean>(false)

  useImperativeHandle(
    ref,
    () => ({
      open: () => setVisible(true),
    }),
    []
  )

  const handleClose = () => {
    setVisible(false)
    form.resetFields()
  }

  const handleChangePassword = () => {
    form
      .validateFields()
      .then(({ confirmNewPassword, ...values }) => {
        setLoading(true)
        return authApi.changePassword({
          email: localStorage.getItem('email') ?? '',
          ...values,
        })
      })
      .then((response: any) => {
        notification.success({ message: response.message })
        setLoading(false)
        handleClose()
      })
      .catch((error) => {
        setLoading(false)
        notification.error({ message: error.message })
      })
  }

  return (
    <ModalCustom
      title='Change Password'
      onCancel={handleClose}
      visible={visible}
      onOk={handleChangePassword}
      okButtonProps={{ loading }}
    >
      <Form form={form} layout='vertical'>
        <FormChangePassword />
      </Form>
    </ModalCustom>
  )
}

export default React.forwardRef(ChangePasswordModal)
