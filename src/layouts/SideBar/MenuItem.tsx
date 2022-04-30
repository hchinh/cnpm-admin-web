import { Menu } from 'antd'
import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { MenuItemProps } from './interface'

const MenuItem: FC<MenuItemProps> = ({ disabled, menu, active }) => {
  const history = useHistory()

  const hasActive = active ? 'active' : ''

  const handleClick = () => {
    history.push(menu.url)
  }

  return (
    <Menu.Item
      className={`sidebar-item ${hasActive}`}
      disabled={disabled}
      title={menu.text}
      onClick={handleClick}
      icon={<menu.IconCPN />}
    >
      <span className='menu-label'>{menu.text}</span>
    </Menu.Item>
  )
}

export default MenuItem
