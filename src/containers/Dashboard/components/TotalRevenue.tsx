import statisticsApi from 'api/statisticsApi'
import StatisticsCard from 'components/common/StatisticsCard'
import { ReportParams } from 'interfaces'
import { useEffect, useState } from 'react'
import { formatMoneySymbol } from 'utils/textUtils'

interface Props {
  timeQuery?: ReportParams
}

const TotalRevenue = ({ timeQuery }: Props) => {
  const [totalRevenue, setTotalRevenue] = useState(0)

  useEffect(() => {
    ;(async () => {
      try {
        const count = await statisticsApi.getRevenue(timeQuery)
        setTotalRevenue(count)
      } catch (error) {
        console.log('Failed to fetch', error)
      }
    })()
  }, [timeQuery])

  return <StatisticsCard title='Total Revenue' customCount={formatMoneySymbol(totalRevenue)} />
}

export default TotalRevenue
