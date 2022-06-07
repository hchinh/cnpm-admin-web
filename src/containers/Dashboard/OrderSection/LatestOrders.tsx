import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import cartApi from 'api/cartApi'
import { Cart, ListParams, ListResponse } from 'interfaces'
import { useEffect, useState } from 'react'
import {
  calculateTotalItems,
  formatOrderStatus,
  formatPaymentType,
  formatPrice,
} from 'utils/textUtils'
import ReportCard from '../components/ReportCard'

const LatestOrders = () => {
  const [latestOrderList, setLatestOrderList] = useState<Cart[]>()
  const [loading, setLoading] = useState(false)

  const queryParams: ListParams = {
    page: 0,
    limit: 5,
    sort: 'id,DESC',
  }

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data }: ListResponse<Cart> = await cartApi.getAll(queryParams)
        setLatestOrderList(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log('Failed to fetch', error)
      }
    })()
  }, []) // eslint-disable-line

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customerName',
    },
    {
      title: 'Total Items',
      dataIndex: 'cartItems',
      render: (data) => calculateTotalItems(data),
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      render: (data) => formatPrice(data),
    },
    {
      title: 'Payment Type',
      dataIndex: 'paymentMethod',
      render: (data) => formatPaymentType(data),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (data) => formatOrderStatus(data),
    },
  ] as ColumnsType<Cart>

  return (
    <ReportCard title='Latest Orders'>
      <Table columns={columns} dataSource={latestOrderList} pagination={false} loading={loading} />
    </ReportCard>
  )
}

export default LatestOrders
