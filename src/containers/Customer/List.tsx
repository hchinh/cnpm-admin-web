import { Image, Pagination, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import customerApi from 'api/customerApi'
import DeleteButton from 'components/actions/DeleteButton'
import GroupActions from 'components/common/GroupActions'
import { Customer, Gender, ListParams, ListResponse, PaginationParams } from 'interfaces'
import { parse, stringify } from 'query-string'
import { FC, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { formatCustomerStatus, formatGender } from 'utils/textUtils'
import CustomerFilter from './Filter'
import ListLayoutStyles from './styles'

const CustomerList: FC = () => {
  const { search } = useLocation()
  const { push, location } = useHistory()

  const [customerList, setCustomerList] = useState<Customer[]>()

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
        const { data, pagination }: ListResponse<Customer> = await customerApi.getAll(queryParams)
        setCustomerList(data)
        setPagination(pagination)
        console.log(pagination)
      } catch (error) {
        console.log('Failed to fetch product list: ', error)
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

  const handleDeleteCustomer = async (id: string) => {
    await customerApi.remove(id)
    setRefetch(!refetch)
  }

  const columns = [
    {
      title: 'Image',
      dataIndex: 'profilePicture',
      width: 120,
      render: (data: any) => (
        <Image
          src={data ? `data:image/jpeg;base64,${data}` : `no-data.jpeg`}
          alt='image'
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '6px',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      ),
    },
    {
      title: 'Username',
      dataIndex: 'userName',
      width: 150,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 250,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: 120,
      filters: [
        { text: 'Male', value: Gender.MALE },
        { text: 'Female', value: Gender.FEMALE },
        { text: 'Others', value: Gender.OTHERS },
      ],
      onFilter: (value, record) => record.gender === value,
      render: (data) => formatGender(data),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 250,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: 350,
    },
    {
      title: 'Active Status',
      dataIndex: 'enabled',
      width: 140,
      render: (data) => formatCustomerStatus(data),
    },
    {
      fixed: 'right',
      width: 60,
      dataIndex: 'id',
      key: 'id',
      render: (data) => (
        <GroupActions>
          <DeleteButton customTitle='Customer' deleteItem={() => handleDeleteCustomer(data)} />
        </GroupActions>
      ),
    },
  ] as ColumnsType<Customer>

  return (
    <ListLayoutStyles>
      <div>
        <CustomerFilter onSubmitFilter={handleFilterChange} onClearFilter={handleClearFilter} />
        <Table
          style={{ marginTop: '10px' }}
          dataSource={customerList}
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

export default CustomerList
