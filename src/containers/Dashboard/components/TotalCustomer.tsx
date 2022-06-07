import statisticsApi from 'api/statisticsApi'
import StatisticsCard from 'components/common/StatisticsCard'
import { ReportParams } from 'interfaces'
import { useEffect, useState } from 'react'

interface Props {
  timeQuery?: ReportParams
}

const TotalCustomer = ({ timeQuery }: Props) => {
  const [totalCustomer, setTotalCustomer] = useState(0)

  useEffect(() => {
    ;(async () => {
      try {
        const count = await statisticsApi.getTotalCustomer(timeQuery)
        setTotalCustomer(count)
      } catch (error) {
        console.log('Failed to fetch', error)
      }
    })()
  }, [timeQuery])

  return <StatisticsCard title='Total Customer' count={totalCustomer} />
}

export default TotalCustomer
