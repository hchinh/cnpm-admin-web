import { Col, Form, Input, Row } from 'antd'
import FormUploadImage from 'components/common/FormUploadImage'
import { FC } from 'react'

const { TextArea } = Input

const CategoryForm: FC = () => {
  return (
    <Row gutter={32}>
      <Col span={12}>
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please enter category name' }]}
        >
          <Input placeholder='Please enter category name' />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name='description' label='Description'>
          <TextArea rows={7} placeholder='Enter description ...' />
        </Form.Item>
      </Col>
      <Col span={24}>
        <FormUploadImage name='thumbnail' label='Thumbnail' />
      </Col>
    </Row>
  )
}

export default CategoryForm
