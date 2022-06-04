import { Col, Form, Input, InputNumber, Row, Select } from 'antd'
import brandApi from 'api/brandApi'
import FormUploadImage from 'components/common/FormUploadImage'
import { Brand, Category } from 'interfaces'
import { FC, useEffect, useState } from 'react'
import { formatterInputNumber, parserInputNumber } from 'utils/tools'

interface Props {
  extraItem?: any
  item?: any
}

const { Option } = Select
const { TextArea } = Input

const ProductForm: FC<Props> = ({ item, extraItem }) => {
  const [brandList, setBrandList] = useState<Brand[]>()

  useEffect(() => {
    ;(async () => {
      try {
        const brands = await brandApi.getAll()
        setBrandList(
          brands.map((brand) => ({
            id: brand.id,
            name: brand.name,
          }))
        )
      } catch (error) {
        console.log('Failed to fetch brand list: ', error)
      }
    })()
  }, [])

  return (
    <Row gutter={32}>
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
          <Select placeholder='Brand'>
            {brandList?.map((item: Brand) => (
              <Option key={item?.id} value={item?.name}>
                {item?.name}
              </Option>
            ))}
          </Select>
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
          <InputNumber
            placeholder='Please enter price'
            formatter={formatterInputNumber}
            parser={parserInputNumber}
          />
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
      <Col span={24}>
        <FormUploadImage name='thumbnail' label='Thumbnail' />
      </Col>
    </Row>
  )
}

export default ProductForm
