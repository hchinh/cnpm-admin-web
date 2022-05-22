import { ReactNode, FC } from 'react'
import PageTitleWrapper from './styles'

interface Props {
  title: string
  description?: string
  className?: string
  extraAction?: ReactNode
}

const PageTitle: FC<Props> = ({ title, description, className, extraAction }) => {
  return (
    <PageTitleWrapper className={className}>
      <div className='page-title__left'>
        <div className='page-title__title'>{title}</div>
        {description && <div className='page-title__desc'>{description}</div>}
      </div>

      <div className='extraAction'>{extraAction}</div>
    </PageTitleWrapper>
  )
}

export default PageTitle
