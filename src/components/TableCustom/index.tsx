import { PaginationProps } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { TableRowSelection } from 'antd/es/table/interface'
import { FilterValue, SorterResult } from 'antd/lib/table/interface'
import { useCallback } from 'react'
import TableWrapper from './styles'

interface MetaPaginationProps {
  totalItems?: number
}
interface Props<T> {
  isSetRowKeyId?: boolean
  columns: ColumnsType<any>
  data: any
  xScroll?: boolean | number | string
  pagination?: PaginationProps
  isShowPagination?: boolean
  loading?: boolean
  rowKeyProp?: string
  handleChangeQueryParams?: (value: any) => void
  queryParams?: any
  meta?: T
  className?: string
  isResetStyles?: boolean
  rowSelection?: TableRowSelection<any>
}

function TableCustom<T extends MetaPaginationProps>({
  columns,
  data,
  xScroll,
  pagination = {},
  rowKeyProp = 'id',
  handleChangeQueryParams = () => null,
  queryParams,
  meta,
  className,
  isResetStyles,
  isShowPagination = true,
  rowSelection,
  ...props
}: Props<T>) {
  const rowKey = (data: any, index?: number) => data[rowKeyProp] || index

  const showTotal = useCallback((total, range) => `${range[0]}-${range[1]}/${total}`, [])

  const onChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[]
  ) => {
    handleChangeQueryParams({
      ...queryParams,
      limit: pagination.pageSize,
      page: pagination.current,
    })
  }

  const paginationResult = isShowPagination
    ? {
        ...(queryParams && {
          total: meta?.totalItems || 0,
          pageSize: queryParams.limit || 10,
          current: queryParams.page || 1,
        }),
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal,
        ...pagination,
      }
    : false

  return (
    <TableWrapper
      columns={columns}
      dataSource={data}
      pagination={paginationResult}
      rowKey={rowKey}
      scroll={{ x: xScroll || 1000 }}
      onChange={onChange}
      {...props}
      rowSelection={rowSelection}
      className={`${isResetStyles ? '' : 'table-custom'} ${className || ''}`}
    />
  )
}

export default TableCustom
