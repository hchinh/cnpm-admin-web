import { Image, Pagination } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import categoryApi from 'api/categoryApi'
import productApi from 'api/productApi'
import CreateButton from 'components/actions/CreateButton'
import DeleteButton from 'components/actions/DeleteButton'
import EditButton from 'components/actions/EditButton'
import GroupActions from 'components/common/GroupActions'
import { Category, ListParams, ListResponse, PaginationParams, Product } from 'interfaces'
import { parse, stringify } from 'query-string'
import { FC, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { formatCategoryById, formatPrice } from 'utils/textUtils'
import CreateProductModal from './Create'
import EditProductModal from './Edit'
import ProductFilter from './Filter'
import ListLayoutStyles from './styles'

const ProductList: FC = () => {
  const { search } = useLocation()
  const { push, location } = useHistory()

  const [productList, setProductList] = useState<Product[]>()
  const [categoryList, setCategoryList] = useState<Category[]>()
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
        const { data, pagination }: ListResponse<Product> = await productApi.getAll(queryParams)
        setProductList(data)
        setPagination(pagination)
      } catch (error) {
        console.log('Failed to fetch product list: ', error)
      }

      setLoading(false)
    })()
  }, [queryParams, refetch])

  useEffect(() => {
    ;(async () => {
      try {
        const categories = await categoryApi.getAll()
        setCategoryList(
          categories.map((category) => ({
            id: category.id,
            name: category.name,
          }))
        )
      } catch (error) {
        console.log('Failed to fetch category list: ', error)
      }
    })()
  }, [])

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

  const handleDeleteProduct = async (id: string) => {
    await productApi.remove(id)
    setRefetch(!refetch)
  }

  const columns = [
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 120,
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 500,
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
      width: 150,
      render: (data) => formatCategoryById(data, categoryList),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 240,
      sorter: (a: Product, b: Product) => a.price - b.price,
      render: (data) => formatPrice(data),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      width: 150,
      key: 'brand',
    },
    {
      title: 'Available',
      dataIndex: 'unitInStock',
      width: 150,
      key: 'unitInStock',
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
          <DeleteButton customTitle='Product' deleteItem={() => handleDeleteProduct(data)} />
        </GroupActions>
      ),
    },
  ] as ColumnsType<Product>

  return (
    <ListLayoutStyles>
      <div>
        <ProductFilter
          onSubmitFilter={handleFilterChange}
          onClearFilter={handleClearFilter}
          categoryList={categoryList}
        />
        <div className='flex-center-end'>
          <CreateButton handleClick={() => setCreateProps({ visible: true })} />
        </div>
        <Table
          style={{ marginTop: '10px' }}
          dataSource={productList}
          columns={columns}
          rowKey='id'
          pagination={false}
          loading={loading}
          scroll={{ x: 1200 }}
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
        <CreateProductModal
          refetch={() => setRefetch(!refetch)}
          extraResource={categoryList}
          visible={createProps.visible}
          closeModal={() => setCreateProps({ visible: false })}
        />
        <EditProductModal
          id={editProps.id}
          resource={productList}
          extraResource={categoryList}
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

export default ProductList
