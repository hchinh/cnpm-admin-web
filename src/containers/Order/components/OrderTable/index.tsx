import { ColumnsType } from 'antd/lib/table'
import { RestShowContext } from 'components/context/RestShowContext'
import { Cart, CartItem } from 'interfaces'
import { FC, useContext } from 'react'
import HeaderTotal from './HeaderTotal'
import OrderBox from './OrderBox'
import { Image } from 'antd'
import { formatPrice } from 'utils/textUtils'
import TableCustom from 'components/TableCustom'

const OrderTable: FC = () => {
  const { record } = useContext(RestShowContext) as {
    record: Cart
  }

  const orderInfo: CartItem[] = record?.cartItems
    ? record?.cartItems?.map((item) => ({
        id: item?.id,
        name: item?.productName,
        thumbnail: item?.productThumbnail,
        quantity: item?.quantity,
        salePrice: item?.salePrice,
        totalAmount: item?.salePrice && item?.quantity && item?.quantity * item?.salePrice,
      }))
    : []

  const columns: ColumnsType<CartItem> = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      width: 150,
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
      title: 'Product',
      dataIndex: 'name',
      width: 400,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: 100,
    },
    {
      title: 'Unit Price',
      dataIndex: 'salePrice',
      render: (data) => formatPrice(data),
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      render: (data) => formatPrice(data),
    },
  ]

  return (
    <OrderBox
      title={
        <HeaderTotal
          title={orderInfo && orderInfo?.length > 1 ? 'Items' : 'Item'}
          total={orderInfo?.length}
        />
      }
    >
      <TableCustom columns={columns} data={orderInfo} />
    </OrderBox>
  )
}

export default OrderTable
