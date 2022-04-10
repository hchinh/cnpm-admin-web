import { Button, Col, Form, Row } from 'antd'
import { ColProps } from 'antd/es/grid/col'
import { FormContextCustom } from 'components/context/FormContextCustom'
import { FC } from 'react'
import RestFilterStyles from './styles'

interface Props {
  onSubmitFilter: (value: any) => void
  onClearFilter: () => void
  responsiveFilter?: ColProps
  responsiveAction?: ColProps
}

const RestFilter: FC<Props> = ({
  children,
  onSubmitFilter = () => null,
  onClearFilter = () => null,
  responsiveFilter = {
    xxl: 20,
    xl: 20,
    lg: 18,
    md: 24,
    xs: 24,
  },
  responsiveAction = {
    xxl: 4,
    xl: 4,
    lg: 6,
    md: 24,
    xs: 24,
  },
}) => {
  const [form] = Form.useForm()

  const onFilter = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmitFilter(values)
      })
      .catch(() => {})
  }

  const onClear = () => {
    form.resetFields()
    onClearFilter()
  }

  return (
    <RestFilterStyles>
      <Form form={form} autoComplete='off'>
        <FormContextCustom.Provider
          value={{
            form,
            allowPressEnter: true,
            handleSubmit: onFilter,
          }}
        >
          <Row gutter={16} className='row-filter'>
            <Col {...responsiveFilter}>{children}</Col>

            <Col {...responsiveAction} className='row-action-bottom'>
              <Button type='primary' className='filterButton' onClick={onFilter}>
                Filter
              </Button>
              <Button className='clearButton' onClick={onClear}>
                Clear
              </Button>
            </Col>
          </Row>
        </FormContextCustom.Provider>
      </Form>
    </RestFilterStyles>
  )
}

export default RestFilter
