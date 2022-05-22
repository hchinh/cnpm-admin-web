import { Pagination, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import cartApi from 'api/cartApi'
import NoteButton from 'components/actions/NoteButton'
import ViewButton from 'components/actions/ViewButton'
import GroupActions from 'components/common/GroupActions'
import PageTitle from 'components/common/PageTitle'
import { Cart, ListParams, ListResponse, PaginationParams } from 'interfaces'
import { parse, stringify } from 'query-string'
import { FC, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { calculateTotalItems, formatDate, formatPaymentType, formatPrice } from 'utils/textUtils'
import StatusSelect from './components/StatusSelect'
import OrderFilter from './Filter'
import ListLayoutStyles from './styles'

const OrderList: FC = () => {
  const { search } = useLocation()
  const { push, location } = useHistory()

  const [orderList, setOrderList] = useState<Cart[]>()

  const [pagination, setPagination] = useState<PaginationParams>({
    page: 0,
    limit: 20,
    total: 20,
  })

  const [loading, setLoading] = useState(true)

  const [refetch, setRefetch] = useState(false)

  const queryParams: ListParams = useMemo(() => {
    const params = parse(search)
    return {
      ...params,
      page: Number(params.page) || 0,
      limit: Number(params.limit) || 20,
    }
  }, [search])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const { data, pagination }: ListResponse<Cart> = await cartApi.getAll(queryParams)
        setOrderList(data)
        setPagination(pagination)
      } catch (error) {
        console.log('Failed to fetch order list: ', error)
      }

      setLoading(false)
    })()
  }, [queryParams, refetch])

  const handlePageChange = (page: number) => {
    const filters = {
      ...queryParams,
      page: page - 1,
    }
    push({
      pathname: location.pathname,
      search: stringify(filters),
    })
  }

  const handleFilterChange = (newFilters: any) => {
    const filters = {
      ...queryParams,
      page: 0,
      ...newFilters,
    }
    push({
      pathname: location.pathname,
      search: stringify(filters),
    })
  }

  const handleClearFilter = () => {
    push({ pathname: location.pathname, search: '' })
  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: 'Customer',
      dataIndex: 'createdBy',
      width: 200,
    },
    {
      title: 'Total Items',
      dataIndex: 'cartItems',
      width: 150,
      render: (data) => calculateTotalItems(data),
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      sorter: (a: Cart, b: Cart) => a.totalCost - b.totalCost,
      width: 180,
      render: (data) => formatPrice(data),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: 360,
    },
    {
      title: 'Payment Type',
      dataIndex: 'paymentMethod',
      width: 150,
      render: (data) => formatPaymentType(data),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 150,
      render: (status, record) => (
        <StatusSelect status={status} cartId={record.id} refetch={() => setRefetch(!refetch)} />
      ),
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      width: 150,
      render: (data) => formatDate(data),
    },
    {
      fixed: 'right',
      width: 80,
      dataIndex: 'id',
      key: 'id',
      render: (id, record) => (
        <GroupActions>
          <NoteButton title={record?.note} />
          <ViewButton id={id} />
        </GroupActions>
      ),
    },
  ] as ColumnsType<Cart>

  return (
    <ListLayoutStyles>
      <div>
        <PageTitle title='Orders' />
        <OrderFilter onSubmitFilter={handleFilterChange} onClearFilter={handleClearFilter} />
        <Table
          style={{ marginTop: '10px' }}
          dataSource={orderList}
          columns={columns}
          rowKey='id'
          pagination={false}
          loading={loading}
          scroll={{ x: 1600 }}
        />
        <div className='list-layout__pagination-bottom'>
          <Pagination
            defaultCurrent={1}
            total={pagination.total}
            current={pagination.page}
            onChange={handlePageChange}
            showQuickJumper
            defaultPageSize={20}
          />
        </div>
      </div>
    </ListLayoutStyles>
  )
}

export default OrderList
