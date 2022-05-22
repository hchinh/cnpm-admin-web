import { Image, Pagination } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import employeeApi from 'api/employeeApi'
import CreateButton from 'components/actions/CreateButton'
import DeleteButton from 'components/actions/DeleteButton'
import EditButton from 'components/actions/EditButton'
import GroupActions from 'components/common/GroupActions'
import PageTitle from 'components/common/PageTitle'
import { Employee, Gender, ListParams, ListResponse, PaginationParams, ROLES } from 'interfaces'
import { parse, stringify } from 'query-string'
import { FC, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { formatCustomerStatus, formatGender, formatRole } from 'utils/textUtils'
import CreateEmployeeModal from './Create'
import EditEmployeeModal from './Edit'
import EmployeeFilter from './Filter'
import ListLayoutStyles from './styles'

const EmployeeList: FC = () => {
  const { search } = useLocation()
  const { push, location } = useHistory()

  const [employeeList, setEmployeeList] = useState<Employee[]>()

  const [pagination, setPagination] = useState<PaginationParams>({
    page: 0,
    limit: 20,
    total: 20,
  })
  const [loading, setLoading] = useState(true)
  const [createProps, setCreateProps] = useState({
    visible: false,
  })
  const [editProps, setEditProps] = useState({
    visible: false,
    id: undefined,
  })
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
        const { data, pagination }: ListResponse<Employee> = await employeeApi.getAll(queryParams)
        setEmployeeList(data)
        setPagination(pagination)
      } catch (error) {
        console.log('Failed to fetch employee list: ', error)
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

  const handleDeleteEmployee = async (id: string) => {
    await employeeApi.remove(id)
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
      title: 'Role',
      dataIndex: 'roleCode',
      width: 100,
      filters: [
        { text: 'Admin', value: ROLES.ADMIN },
        { text: 'Employee', value: ROLES.EMPLOYEE },
      ],
      onFilter: (value, record) => record.roleCode === value,
      render: (data) => formatRole(data),
    },
    {
      fixed: 'right',
      width: 80,
      dataIndex: 'id',
      key: 'id',
      render: (data) => (
        <GroupActions>
          <EditButton
            handleClick={() =>
              setEditProps({
                visible: true,
                id: data,
              })
            }
          />
          <DeleteButton customTitle='Employee' deleteItem={() => handleDeleteEmployee(data)} />
        </GroupActions>
      ),
    },
  ] as ColumnsType<Employee>

  return (
    <ListLayoutStyles>
      <div>
        <PageTitle title='Employees' />
        <EmployeeFilter onSubmitFilter={handleFilterChange} onClearFilter={handleClearFilter} />
        <div className='flex-center-end'>
          <CreateButton handleClick={() => setCreateProps({ visible: true })} />
        </div>
        <Table
          style={{ marginTop: '10px' }}
          dataSource={employeeList}
          columns={columns}
          rowKey='id'
          pagination={false}
          loading={loading}
          scroll={{ x: 1700 }}
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
        <CreateEmployeeModal
          refetch={() => setRefetch(!refetch)}
          visible={createProps.visible}
          closeModal={() => setCreateProps({ visible: false })}
        />
        <EditEmployeeModal
          id={editProps.id}
          resource={employeeList}
          visible={editProps.visible}
          closeModal={() =>
            setEditProps({
              ...editProps,
              visible: false,
            })
          }
          refetch={() => setRefetch(!refetch)}
        />
      </div>
    </ListLayoutStyles>
  )
}

export default EmployeeList
