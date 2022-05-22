import { Spin } from 'antd'
import BreadcrumbCustom from 'components/common/BreadcrumbCustom'
import PageTitle from 'components/common/PageTitle'
import { RestShowContext } from 'components/context/RestShowContext'
import { IRestShowLayout } from 'interfaces'
import isEmpty from 'lodash/isEmpty'
import { FC } from 'react'

const RestShow: FC<IRestShowLayout> = ({
  resource,
  children,
  extraAction,
  formatBreadcrumb,
  showHeader = true,
  record,
}) => {
  return isEmpty(record) ? (
    <div className='flex-center'>
      <Spin />
    </div>
  ) : (
    <RestShowContext.Provider value={{ record: record || {} }}>
      {formatBreadcrumb && <BreadcrumbCustom data={formatBreadcrumb(record)} />}

      {showHeader && <PageTitle title={`${resource} Detail`} extraAction={extraAction} />}

      <div className='rest-show-content'>{children}</div>
    </RestShowContext.Provider>
  )
}

export default RestShow
