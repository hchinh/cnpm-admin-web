import { ApexOptions } from 'apexcharts'
import statisticsApi from 'api/statisticsApi'
import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

const CategoryStatistics = () => {
  const [statistics, setStatistics] = useState<any[]>()

  useEffect(() => {
    ;(async () => {
      try {
        const data = await statisticsApi.getCategoriesStatistics()
        setStatistics(data)
      } catch (error) {
        console.log('Failed to fetch')
      }
    })()
  }, [])

  const chartOptions = {
    series: statistics,
    options: {
      color: ['#6ab04c', '#2980b9'],
      chart: {
        background: 'transparent',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      legend: {
        position: 'top',
      },
      grid: {
        show: true,
      },
    },
  }

  return (
    <Chart
      options={chartOptions.options as ApexOptions}
      series={chartOptions.series}
      type='bar'
      height='100%'
    />
  )
}

export default CategoryStatistics
