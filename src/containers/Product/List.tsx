import { Image, Pagination } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import categoryApi from 'api/categoryApi'
import productApi from 'api/productApi'
import { Category, ListParams, ListResponse, PaginationParams, Product } from 'interfaces'
import { parse, stringify } from 'query-string'
import { FC, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { formatCategoryById, formatPrice } from 'utils/textUtils'
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
  }, [queryParams])

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

  console.log(categoryList)

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
      width: 550,
    },
    {
      title: 'Category',
      dataIndex: 'categoryId',
      key: 'categoryId',
      width: 160,
      render: (data) => formatCategoryById(data, categoryList),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 200,
      sorter: (a: Product, b: Product) => a.price - b.price,
      render: (data) => formatPrice(data),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      width: 120,
      key: 'brand',
    },
    {
      title: 'Available',
      dataIndex: 'unitInStock',
      key: 'unitInStock',
    },
  ] as ColumnsType<Product>

  return (
    <ListLayoutStyles>
      <div>
        <Table
          dataSource={productList}
          columns={columns}
          rowKey='id'
          pagination={false}
          loading={loading}
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

export default ProductList
