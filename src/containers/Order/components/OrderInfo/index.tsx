import { Col, Divider, Row } from 'antd'
import { RestShowContext } from 'components/context/RestShowContext'
import { Cart } from 'interfaces'
import { FC, useContext } from 'react'
import { formatDate, formatOrderStatus, formatPrice } from 'utils/textUtils'
import OrderInfoStyles from './styles'
import UserInfo from './UserInfo'

const OrderInfo: FC = () => {
  const { record } = useContext(RestShowContext) as {
    record: Cart
  }

  const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  return (
    <OrderInfoStyles className='box-wrapper'>
      <UserInfo record={record} />

      <Divider />

      <div className='status-info'>
        <Row gutter={20}>
          <Col span={12}>Address</Col>
          <Col span={12} className='fw-500'>
            {record?.address}
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={12}>Status</Col>
          <Col span={12}>{formatOrderStatus(record?.status)}</Col>
        </Row>

        <Row gutter={20}>
          <Col span={12}>Payment Type</Col>
          <Col span={12} className='fw-500'>
            {capitalizeFirstLetter(record?.paymentMethod ?? '')}
          </Col>
        </Row>

        <Row gutter={20}>
          <Col span={12}>Created At</Col>
          <Col span={12} className='fw-500'>
            {formatDate(record?.createdDate)}
          </Col>
        </Row>
      </div>

      <Divider />

      <div className='amount-info'>
        <Row gutter={20}>
          <Col span={12}>Total Cost</Col>
          <Col span={12} className='fw-600'>
            {formatPrice(record?.totalCost)}
          </Col>
        </Row>
      </div>
    </OrderInfoStyles>
  )
}

export default OrderInfo
