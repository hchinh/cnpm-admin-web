import statisticsApi from 'api/statisticsApi'
import StatisticsCard from 'components/common/StatisticsCard'
import { ReportParams } from 'interfaces'
import { useEffect, useState } from 'react'

interface Props {
  timeQuery?: ReportParams
}

const TotalSales = ({ timeQuery }: Props) => {
  const [totalSales, setTotalSales] = useState(0)

  useEffect(() => {
    ;(async () => {
      try {
        const count = await statisticsApi.getTotalSales(timeQuery)
        setTotalSales(count)
      } catch (error) {
        console.log('Failed to fetch', error)
      }
    })()
  }, [timeQuery])

  return <StatisticsCard title='Total Sales' count={totalSales} />
}

export default TotalSales
