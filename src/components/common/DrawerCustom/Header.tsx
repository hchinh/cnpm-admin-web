import { FC } from 'react'
import { CloseSquareOutlined } from '@ant-design/icons'
import { HeaderStyles } from './styles'

interface Props {
  title: string
  onClose?: (e: React.MouseEvent<HTMLElement>) => void
}

const Header: FC<Props> = ({ title, onClose }) => {
  return (
    <HeaderStyles>
      <div className='drawer-header-title'>{title}</div>
      <CloseSquareOutlined onClick={onClose} className='drawer-header-icon' type='close-square' />
    </HeaderStyles>
  )
}

export default Header
