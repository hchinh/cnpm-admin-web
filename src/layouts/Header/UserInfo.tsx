import { LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons'
import { unwrapResult } from '@reduxjs/toolkit'
import { Avatar, Dropdown, Menu } from 'antd'
import employeeApi from 'api/employeeApi'
import { useAppDispatch } from 'app/hooks'
import { ROLES_CONST } from 'configs/localData'
import { Employee } from 'interfaces'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { logout } from 'redux/authSlice'
import { MenuStyles } from './styles'

function UserInfo() {
  const dispatch = useAppDispatch()
  const { push } = useHistory()

  const [profile, setProfile] = useState<Employee>()
  const [roleName, setRoleName] = useState<string>()

  useEffect(() => {
    ;(async () => {
      try {
        const id = Number(localStorage.getItem('id'))
        const data: Employee = await employeeApi.getById(id)
        setProfile(data)
        const role = ROLES_CONST.find((item) => item.value === data?.roleCode)
        setRoleName(role?.text)
      } catch (error) {
        console.log('Failed to fetch profile: ', error)
      }
    })()
  }, [])

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logout())
      unwrapResult(resultAction)
      push('/login')
    } catch (error) {}
  }

  const userDropdown = (
    <MenuStyles>
      <Menu.Item key='profile'>
        <div className='div-menu-item'>
          <Link to='/profile' className='link-menu-item'>
            <div className='profile-menu-item'>
              <ProfileOutlined className='icon-menu-item' />
              <span>Profile</span>
            </div>
          </Link>
        </div>
      </Menu.Item>

      <Menu.Item key='logout'>
        <div className='div-menu-item' onClick={handleLogout}>
          <LogoutOutlined className='icon-menu-item' />
          Logout
        </div>
      </Menu.Item>
    </MenuStyles>
  )

  return (
    <div>
      <Dropdown overlay={userDropdown} trigger={['click']}>
        <div className='div-user-info'>
          <span className='userInfo'>
            <strong>{profile?.name}</strong>
            <span className='role'>{roleName}</span>
          </span>
          <Avatar
            size='large'
            src={
              profile?.profilePicture
                ? `data:image/jpeg;base64,${profile?.profilePicture}`
                : 'default-avatar.jpeg'
            }
            icon={<UserOutlined />}
          />
        </div>
      </Dropdown>
    </div>
  )
}

export default UserInfo
