import { FC, ReactNode } from 'react'

interface Props {
  icon?: ReactNode
  title: string
}

const HeaderModal: FC<Props> = ({ icon, title }) => {
  return (
    <div className='header-modal'>
      {icon}
      <span className='header-modal__title'>{title}</span>
    </div>
  )
}

export default HeaderModal
