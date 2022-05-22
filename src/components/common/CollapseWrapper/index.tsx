import { FC, ReactNode, useState } from 'react'
import { Row, Col } from 'antd'
import CollapseWrapperStyles from './styles'
import ToggleButton from 'components/actions/ToggleButton'

interface Props {
  leftComponent: ReactNode
  rightComponent: ReactNode
  leftSpan?: number
  rightSpan?: number
}

const CollapseWrapper: FC<Props> = ({
  leftComponent,
  rightComponent,
  leftSpan = 6,
  rightSpan = 18,
}) => {
  const [isCollapse, setIsCollapse] = useState(false)

  const handleToggle = () => {
    setIsCollapse(!isCollapse)
  }

  return (
    <CollapseWrapperStyles>
      <Row gutter={20} className='row-collapsed-detail' wrap={false}>
        <Col
          xl={leftSpan}
          lg={leftSpan}
          md={24}
          xs={24}
          className={`col-info ${isCollapse ? 'collapsed-container' : ''}`}
        >
          {leftComponent}
        </Col>

        <Col
          xl={isCollapse ? 24 : rightSpan}
          lg={isCollapse ? 24 : rightSpan}
          md={24}
          xs={24}
          className='col-right'
        >
          {rightComponent}
        </Col>
      </Row>
      <ToggleButton isCollapse={isCollapse} handleToggle={handleToggle} />
    </CollapseWrapperStyles>
  )
}

export default CollapseWrapper
