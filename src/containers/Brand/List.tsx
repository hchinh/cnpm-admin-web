import { Image, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import brandApi from 'api/brandApi'
import CreateButton from 'components/actions/CreateButton'
import DeleteButton from 'components/actions/DeleteButton'
import EditButton from 'components/actions/EditButton'
import GroupActions from 'components/common/GroupActions'
import { Brand, Category, ListParams } from 'interfaces'
import { parse, stringify } from 'query-string'
import { FC, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import CreateBrandModal from './Create'
import EditBrandModal from './Edit'
import BrandFilter from './Filter'
import ListLayoutStyles from './styles'

const BrandList: FC = () => {
  const { search } = useLocation()
  const { push, location } = useHistory()

  const [brandList, setBrandList] = useState<Brand[]>()
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
      page: 0,
      limit: 20,
    }
  }, [search])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const brands = await brandApi.getAll(queryParams)
        setBrandList(brands)
      } catch (error) {
        console.log('Failed to fetch brand list: ', error)
      }

      setLoading(false)
    })()
  }, [refetch, queryParams])

  const handleFilterChange = (newFilters: any) => {
    const filters = { ...queryParams, ...newFilters }
    push({
      pathname: location.pathname,
      search: stringify(filters),
    })
  }

  const handleClearFilter = () => {
    push({ pathname: location.pathname, search: '' })
  }

  const handleDeleteBrand = async (id: string) => {
    await brandApi.remove(id)
    setRefetch(!refetch)
  }

  const columns = [
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      width: 200,
      render: (data: any) => (
        <Image
          src={data ? `data:image/jpeg;base64,${data}` : `no-data.jpeg`}
          alt='image'
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '6px',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      ),
    },
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 250,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 550,
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
          <DeleteButton customTitle='Category' deleteItem={() => handleDeleteBrand(data)} />
        </GroupActions>
      ),
    },
  ] as ColumnsType<Category>

  return (
    <ListLayoutStyles>
      <div>
        <BrandFilter onSubmitFilter={handleFilterChange} onClearFilter={handleClearFilter} />
        <div className='flex-center-end'>
          <CreateButton handleClick={() => setCreateProps({ visible: true })} />
        </div>
        <Table
          style={{ marginTop: '10px' }}
          dataSource={brandList}
          columns={columns}
          loading={loading}
          scroll={{ x: 1100 }}
        />
        <CreateBrandModal
          refetch={() => setRefetch(!refetch)}
          visible={createProps.visible}
          closeModal={() => setCreateProps({ visible: false })}
        />
        <EditBrandModal
          id={editProps.id}
          resource={brandList}
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

export default BrandList
