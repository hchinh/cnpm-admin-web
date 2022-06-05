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
      const count = await statisticsApi.getTotalSales(timeQuery)
      setTotalSales(count)
    })()
  }, [timeQuery])

  return <StatisticsCard title='Total Sales' count={totalSales} />
}

export default TotalSales
