import { Col, Form, Row, Select, Tooltip } from 'antd'
import brandApi from 'api/brandApi'
import RestFilter from 'components/RestLayout/RestFilter'
import { Brand, Category } from 'interfaces'
import { FC, useEffect, useState } from 'react'
import FormInput from './components/Filter/FormInput'

interface Props {
  onSubmitFilter: (value: any) => void
  onClearFilter: () => void
  categoryList?: Category[]
}

const { Option } = Select

const ProductFilter: FC<Props> = ({ onSubmitFilter, onClearFilter, categoryList }) => {
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
    <RestFilter onSubmitFilter={onSubmitFilter} onClearFilter={onClearFilter}>
      <Row gutter={16}>
        <Col lg={8} md={12} xs={24}>
          <FormInput />
        </Col>
        <Col lg={8} md={12} xs={24}>
          <Tooltip title='Category'>
            <Form.Item name='categoryId'>
              <Select placeholder='Category'>
                {categoryList?.map((item: Category) => (
                  <Option key={item?.id} value={item?.id}>
                    {item?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Tooltip>
        </Col>
        <Col lg={8} md={12} xs={24}>
          <Tooltip title='Brand'>
            <Form.Item name='brand'>
              <Select placeholder='Brand'>
                {brandList?.map((item: Brand) => (
                  <Option key={item?.id} value={item?.name}>
                    {item?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Tooltip>
        </Col>
      </Row>
    </RestFilter>
  )
}

export default ProductFilter
