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
      try {
        const count = await statisticsApi.getTotalOrders(timeQuery)
        setTotalOrders(count)
      } catch (error) {
        console.log('Failed to fetch')
      }
    })()
  }, [timeQuery])

  return <StatisticsCard title='Total Orders' count={totalOrders} />
}

export default TotalOrders
