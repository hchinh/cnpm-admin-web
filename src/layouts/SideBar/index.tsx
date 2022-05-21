import {
  AppstoreOutlined,
  BarsOutlined,
  RedditOutlined,
  ShoppingOutlined,
  SkinOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { SIDEBAR_WIDTH } from 'theme/constants'
import { SidebarMenuItemProps } from './interface'
import MenuItem from './MenuItem'
import SideBarStyles from './styles'

const getCurrentTab = (str: string) => {
  const paths = str && str.split('/')
  return paths && paths[1]
}

const { Sider } = Layout

const SideBar: FC = () => {
  const { pathname } = useLocation()

  const url = getCurrentTab(pathname)

  const sidebarMenu = [
    {
      key: 'home',
      text: 'Dashboard',
      IconCPN: AppstoreOutlined,
      url: '/',
    },
    {
      key: 'products',
      text: 'Products',
      IconCPN: SkinOutlined,
      url: '/products',
    },
    {
      key: 'orders',
      text: 'Orders',
      IconCPN: ShoppingOutlined,
      url: '/carts',
    },
    {
      key: 'categories',
      text: 'Categories',
      IconCPN: BarsOutlined,
      url: '/categories',
    },
    {
      key: 'brands',
      text: 'Brands',
      IconCPN: RedditOutlined,
      url: '/brands',
    },
    {
      key: 'customers',
      text: 'Customers',
      IconCPN: UserOutlined,
      url: '/customers',
    },
    {
      key: 'employees',
      text: 'Employees',
      IconCPN: TeamOutlined,
      url: '/employees',
    },
  ] as SidebarMenuItemProps[]

  const activeItem = sidebarMenu.findIndex((item) => item.url === pathname)

  return (
    <SideBarStyles>
      <Sider className='sidebar' width={SIDEBAR_WIDTH} theme='light'>
        <div className='logo'>LOGO</div>
        <Menu mode='inline' selectedKeys={[url || 'home']} defaultSelectedKeys={[url || 'home']}>
          {sidebarMenu.map((menu, index) => (
            <MenuItem key={menu.key} menu={menu} active={index === activeItem} />
          ))}
        </Menu>
      </Sider>
    </SideBarStyles>
  )
}

export default SideBar
