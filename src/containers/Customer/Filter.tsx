import { Col, Row } from 'antd'
import RestFilter from 'components/RestLayout/RestFilter'
import { FC } from 'react'
import FormInput from './components/Filter/FormInput'

interface Props {
  onSubmitFilter: (value: any) => void
  onClearFilter: () => void
}

const CustomerFilter: FC<Props> = ({ onSubmitFilter, onClearFilter }) => {
  return (
    <RestFilter onSubmitFilter={onSubmitFilter} onClearFilter={onClearFilter}>
      <Row gutter={16}>
        <Col lg={8} md={12} xs={24}></Col>
        <Col lg={8} md={12} xs={24}></Col>
        <Col lg={8} md={12} xs={24}>
          <FormInput />
        </Col>
      </Row>
    </RestFilter>
  )
}

export default CustomerFilter
