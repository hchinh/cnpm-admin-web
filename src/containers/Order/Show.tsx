import cartApi from 'api/cartApi'
import CollapseWrapper from 'components/common/CollapseWrapper'
import RestShow from 'components/RestLayout/RestShow'
import { Cart, IParamsRouterShowPage } from 'interfaces'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OrderInfo from './components/OrderInfo'
import OrderTable from './components/OrderTable'

function OrderDetail() {
  const [record, setRecord] = useState<Cart>()
  const { id }: IParamsRouterShowPage = useParams()

  useEffect(() => {
    ;(async () => {
      const data = await cartApi.getById(Number(id))
      setRecord(data)
    })()
  }, [id])

  const formatBreadcrumb = (record: Cart) => [
    {
      title: 'Orders',
      path: '/orders',
    },
    {
      title: `Order#${record?.id}` || '',
    },
  ]

  return (
    <RestShow resource='Order' formatBreadcrumb={formatBreadcrumb} record={record}>
      <CollapseWrapper leftComponent={<OrderInfo />} rightComponent={<OrderTable />} />
    </RestShow>
  )
}

export default OrderDetail
