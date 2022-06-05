import statisticsApi from 'api/statisticsApi'
import StatisticsCard from 'components/common/StatisticsCard'
import { ReportParams } from 'interfaces'
import { useEffect, useState } from 'react'
import { formatPrice } from 'utils/textUtils'

interface Props {
  timeQuery?: ReportParams
}

const TotalRevenue = ({ timeQuery }: Props) => {
  const [totalRevenue, setTotalRevenue] = useState(0)

  useEffect(() => {
    ;(async () => {
      const count = await statisticsApi.getRevenue(timeQuery)
      setTotalRevenue(count)
    })()
  }, [timeQuery])

  return <StatisticsCard title='Total Revenue' customCount={formatPrice(totalRevenue)} />
}

export default TotalRevenue
