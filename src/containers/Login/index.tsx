import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { unwrapResult } from '@reduxjs/toolkit'
import { Button, Form, Input, Space } from 'antd'
import { useAppDispatch } from 'app/hooks'
import { LoginPayload } from 'interfaces'
import React, { FC } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { login } from 'redux/authSlice'
import { LoginPageStyles } from './styles'

const LoginPage: FC = () => {
  const { push } = useHistory()
  const dispatch = useAppDispatch()

  const onFinish = async (values: LoginPayload) => {
    try {
      const resultAction = await dispatch(login(values))
      unwrapResult(resultAction)
      push('/')
    } catch (error) {
      console.log('Failed to login: ', error)
    }
  }

  return (
    <LoginPageStyles>
      <div className='banner'>
        <img src='background.png' alt='banner' />
      </div>
      <div className='content'>
        <span className='content-header'>Welcome back</span>
        <header className='content-title'>Login to your account</header>
        <Form
          name='normal_login'
          className='login-form'
          onFinish={onFinish}
          layout='vertical'
          size='large'
        >
          <Form.Item label='Username'>
            <Space>
              <Form.Item
                name='userName'
                noStyle
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input
                  style={{ width: 360 }}
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='Username'
                />
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item label='Password'>
            <Space>
              <Form.Item
                name='password'
                noStyle
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input.Password
                  style={{ width: 360 }}
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  placeholder='Password'
                />
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item>
            <Link className='login-form-forgot' to='/forgot-password'>
              Forgot password?
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              style={{ width: 360 }}
              htmlType='submit'
              className='login-form-button'
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginPageStyles>
  )
}

export default LoginPage
