import { FC } from 'react'
import CustomButtonWrapper from './CustomButtonWrapper'
import { ICustomButton } from './interface'
import { CustomButtonStyles } from './styles'

interface Props extends ICustomButton {}

const CustomButton: FC<Props> = ({ title, handleClick, buttonProps }) => (
  <CustomButtonStyles className='custom-button'>
    <CustomButtonWrapper title={title} handleClick={handleClick} buttonProps={buttonProps} />
  </CustomButtonStyles>
)

export default CustomButton
