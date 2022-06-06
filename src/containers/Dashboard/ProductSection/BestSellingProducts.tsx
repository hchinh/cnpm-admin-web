import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import statisticsApi from 'api/statisticsApi'
import { useEffect, useState } from 'react'
import { formatPrice } from 'utils/textUtils'
import ReportCard from '../components/ReportCard'

const BestSellingProducts = () => {
  const [bestSellingProductList, setBestSellingProductList] = useState<any[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const data = await statisticsApi.getTopProduct()
        setBestSellingProductList(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log('Failed to fetch', error)
      }
    })()
  }, [])

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Revenue',
      dataIndex: 'totalPrice',
      render: (data) => formatPrice(data),
    },
  ] as ColumnsType<any>

  return (
    <ReportCard title='Best Selling Products'>
      <Table
        columns={columns}
        dataSource={bestSellingProductList}
        pagination={false}
        loading={loading}
      />
    </ReportCard>
  )
}

export default BestSellingProducts
