import statisticsApi from 'api/statisticsApi'
import StatisticsCard from 'components/common/StatisticsCard'
import { ReportParams } from 'interfaces'
import { useEffect, useState } from 'react'

interface Props {
  timeQuery?: ReportParams
}

const TotalOrders = ({ timeQuery }: Props) => {
  const [totalOrders, setTotalOrders] = useState(0)

  useEffect(() => {
    ;(async () => {
      const count = await statisticsApi.getTotalOrders(timeQuery)
      setTotalOrders(count)
    })()
  }, [timeQuery])

  return <StatisticsCard title='Total Orders' count={totalOrders} />
}

export default TotalOrders
