import { DrawerCustomProps } from 'interfaces'
import { FC } from 'react'
import { DrawerWrapper } from './styles'

const DrawerRoute: FC<DrawerCustomProps> = ({ width = 800, children, onClose, ...props }) => (
  <DrawerWrapper
    width={width}
    onClose={onClose}
    contentWrapperStyle={{ maxWidth: '100vw' }}
    {...props}
    destroyOnClose
    closable={false}
    footer={null}
  >
    {children}
  </DrawerWrapper>
)

export default DrawerRoute
