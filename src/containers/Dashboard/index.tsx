import { Col, Row } from 'antd'
import TotalCustomer from './components/TotalCustomer'
import TotalOrders from './components/TotalOrders'
import TotalRevenue from './components/TotalRevenue'
import TotalSales from './components/TotalSales'
import LatestOrders from './OrderSection/LatestOrders'
import BestSellingProducts from './ProductSection/BestSellingProducts'

const DashboardPage = () => {
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Row gutter={20}>
            <Col span={12}>
              <TotalCustomer />
            </Col>
            <Col span={12}>
              <TotalRevenue />
            </Col>
          </Row>
          <Row gutter={20} className='mt-20'>
            <Col span={12}>
              <TotalSales />
            </Col>
            <Col span={12}>
              <TotalOrders />
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <LatestOrders />
        </Col>
      </Row>
      <Row gutter={20} className='mt-20'>
        <Col span={16}>Chart</Col>
        <Col span={8}>
          <BestSellingProducts />
        </Col>
      </Row>
    </>
  )
}

export default DashboardPage
