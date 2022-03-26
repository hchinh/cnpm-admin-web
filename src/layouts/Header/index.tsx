import { FC } from 'react'
import HeaderWrapper from './styles'

const Header: FC = () => {
  return (
    <HeaderWrapper className='header'>
      <div className='leftHeader'>Left</div>
      <div className='rightHeader'>Right</div>
    </HeaderWrapper>
  )
}

export default Header
