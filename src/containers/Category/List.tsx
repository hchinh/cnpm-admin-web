import { Image, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import categoryApi from 'api/categoryApi'
import CreateButton from 'components/actions/CreateButton'
import DeleteButton from 'components/actions/DeleteButton'
import EditButton from 'components/actions/EditButton'
import GroupActions from 'components/common/GroupActions'
import { Category, ListParams } from 'interfaces'
import { parse, stringify } from 'query-string'
import { FC, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import CreateCategoryModal from './Create'
import EditCategoryModal from './Edit'
import CategoryFilter from './Filter'
import ListLayoutStyles from './styles'

const CategoryList: FC = () => {
  const { search } = useLocation()
  const { push, location } = useHistory()

  const [categoryList, setCategoryList] = useState<Category[]>()
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
        const categories = await categoryApi.getAll(queryParams)
        setCategoryList(categories)
      } catch (error) {
        console.log('Failed to fetch category list: ', error)
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

  const handleDeleteCategory = async (id: string) => {
    await categoryApi.remove(id)
    setRefetch(!refetch)
  }

  const columns = [
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      render: (data: any) => (
        <Image
          src={`data:image/jpeg;base64,${data}`}
          alt='image'
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '8px',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      ),
    },
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      fixed: 'right',
      width: 120,
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
          <DeleteButton customTitle='Category' deleteItem={() => handleDeleteCategory(data)} />
        </GroupActions>
      ),
    },
  ] as ColumnsType<Category>

  return (
    <ListLayoutStyles>
      <div>
        <CategoryFilter onSubmitFilter={handleFilterChange} onClearFilter={handleClearFilter} />
        <div className='flex-center-end'>
          <CreateButton handleClick={() => setCreateProps({ visible: true })} />
        </div>
        <Table
          style={{ marginTop: '10px' }}
          dataSource={categoryList}
          columns={columns}
          loading={loading}
        />
        <CreateCategoryModal
          refetch={() => setRefetch(!refetch)}
          visible={createProps.visible}
          closeModal={() => setCreateProps({ visible: false })}
        />
        <EditCategoryModal
          id={editProps.id}
          resource={categoryList}
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

export default CategoryList
