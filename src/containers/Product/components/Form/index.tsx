import { Col, Form, Input, InputNumber, Row, Select } from 'antd'
import { Category } from 'interfaces'
import { FC } from 'react'
import { formatterInputNumber, parserInputNumber } from 'utils/tools'

interface Props {
  extraItem?: any
  item?: any
}

const { Option } = Select
const { TextArea } = Input

const ProductForm: FC<Props> = ({ item, extraItem }) => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please enter product name' }]}
        >
          <Input placeholder='Please enter product name' />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name='categoryId'
          label='Category'
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder='Please select a category'>
            {extraItem?.map((item: Category) => (
              <Option key={item?.id} value={item?.id}>
                {item?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name='brand' label='Brand'>
          <Input placeholder='Brand...' />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name='unitInStock'
          label='Unit In Stock'
          rules={[{ required: true, message: 'Please enter unit in stock' }]}
        >
          <InputNumber
            placeholder='Please enter unit in stock'
            formatter={formatterInputNumber}
            parser={parserInputNumber}
          />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name='price'
          label='Price'
          rules={[{ required: true, message: 'Please enter price' }]}
        >
          <InputNumber placeholder='Please enter price' />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name='description'
          label='Description'
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <TextArea rows={7} placeholder='Enter description ...' />
        </Form.Item>
      </Col>
    </Row>
  )
}

export default ProductForm
