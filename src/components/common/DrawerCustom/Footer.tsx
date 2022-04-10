import { Button } from 'antd'
import { ButtonProps } from 'antd/es/button'
import { FC } from 'react'
import { FooterStyles } from './styles'

interface Props {
  onClose?: (e: React.MouseEvent<HTMLElement>) => void
  onOk?: (e: React.MouseEvent<HTMLElement>) => void
  okButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  okText?: string
}

const Footer: FC<Props> = ({
  onClose,
  onOk,
  okButtonProps,
  cancelButtonProps,
  okText = 'Save',
}) => {
  return (
    <FooterStyles className='footer-drawer'>
      <Button
        onClick={onClose}
        className='footer-drawer-btn w-50 cancel-button'
        {...cancelButtonProps}
      >
        Cancel
      </Button>
      <Button onClick={onOk} className='footer-drawer-btn w-50' type='primary' {...okButtonProps}>
        {okText}
      </Button>
    </FooterStyles>
  )
}

export default Footer
