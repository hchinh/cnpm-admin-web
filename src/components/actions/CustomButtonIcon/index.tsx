import { FC } from 'react'
import ButtonIcon from './ButtonIcon'
import { ICustomButtonIcon } from './interface'
import { CustomButtonIconWrapper } from './styles'

interface Props extends ICustomButtonIcon {
  className?: string
}

const CustomButtonIcon: FC<Props> = ({ handleClick, icon, title, buttonProps, className }) => {
  return (
    <CustomButtonIconWrapper className={`custom-button-icon-wrapper ${className || ''}`}>
      <ButtonIcon title={title} handleClick={handleClick} buttonProps={buttonProps} icon={icon} />
    </CustomButtonIconWrapper>
  )
}

export default CustomButtonIcon
