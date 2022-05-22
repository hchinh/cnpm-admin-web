import { Breadcrumb } from 'antd'
import { IBreadcrumb } from 'interfaces/restTitle'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { BreadcrumbWrapper } from './styles'

interface Props {
  data: IBreadcrumb[]
}

const BreadcrumbCustom: FC<Props> = ({ data }) => {
  return (
    <BreadcrumbWrapper>
      <Breadcrumb separator='>'>
        {data.map((data, index) => (
          <Breadcrumb.Item key={String(index)}>
            {data.path ? (
              <Link to={data.path}>
                <span className='breadcrumb-item__name breadcrumb-item__link'>{data.title}</span>
              </Link>
            ) : (
              <span className='breadcrumb-item__name'>{data.title ? data.title : 'N/A'}</span>
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </BreadcrumbWrapper>
  )
}

export default BreadcrumbCustom
