import { Divider } from 'antd'
import { FC } from 'react'
import ReportCardStyles from './styles'

interface Props {
  title: string
  customAction?: any
}

const ReportCard: FC<Props> = ({ title, children, customAction }) => {
  return (
    <ReportCardStyles>
      <div>
        <div className='report-card__header flex-center-between'>
          <div className='report-card__header-title'>{title}</div>
          <div className='report-card__header-action'>{customAction}</div>
        </div>
        <Divider />
      </div>

      <div className='report-card__body'>{children}</div>
    </ReportCardStyles>
  )
}

export default ReportCard
