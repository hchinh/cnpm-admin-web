import { Form, Input } from 'antd'

const ChangePasswordForm = () => {
  return (
    <div>
      <Form.Item
        name='oldPassword'
        label='Old Password'
        rules={[
          {
            required: true,
            message: 'Please input your current password!',
          },
          {
            whitespace: true,
            message: "This field can't empty",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='password'
        label='New Password'
        rules={[
          {
            required: true,
            message: 'Please input your new password!',
          },
          {
            whitespace: true,
            message: "This field can't empty",
          },
          {
            pattern: /^.{6,}$/,
            message: 'Password must contain at least 6 characters',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name='confirmNewPassword'
        label='Confirm New Password'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your new password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('The two new passwords that you entered do not match!')
              )
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    </div>
  )
}

export default ChangePasswordForm
