import { StatisticsCardStyles } from './style'

interface Props {
  count?: number
  title: string
  customCount?: string
}

const StatisticsCard = ({ count, title, customCount }: Props) => (
  <StatisticsCardStyles>
    <div className='status-card'>
      <div className='status-card__info'>
        <h4>{customCount || count}</h4>
        <span>{title}</span>
      </div>
    </div>
  </StatisticsCardStyles>
)

export default StatisticsCard
