import { CheckCircleFilled } from '@ant-design/icons'
import { Dropdown, Menu, Spin } from 'antd'
import cartApi from 'api/cartApi'
import TagCustom from 'components/common/TagCustom'
import { ORDER_STATUS } from 'configs/localData'
import { Status } from 'interfaces'
import { FC, useMemo, useState } from 'react'
import { StatusWrapper, StatusItemStyles } from './styles'

interface Props {
  status: string
  cartId: number
  refetch: () => void
}

const StatusSelect: FC<Props> = ({ status, cartId, refetch }) => {
  const [loading, setLoading] = useState(false)

  const statusItem = useMemo(() => ORDER_STATUS.find((item) => item.value === status), [status])

  const isDisabled = useMemo(() => status === Status.COMPLETED, [status])

  const handleChange = async (value: string) => {
    setLoading(true)
    await cartApi.updateStatus(
      {
        userId: localStorage.getItem('id'),
        status: value,
      },
      cartId
    )
    setLoading(false)
    refetch()
  }

  const menu = (
    <Menu>
      {ORDER_STATUS.map((item) => (
        <Menu.Item key={item.value}>
          <StatusItemStyles
            className='item-status'
            role='presentation'
            onClick={() => handleChange(item.value)}
            style={{
              color: item.colorText,
              background: item.backgroundColor,
            }}
          >
            <div className='left-status'>
              <span className='name-status'>{item.text}</span>
            </div>
            <div className='right-status'>{status === item.value && <CheckCircleFilled />}</div>
          </StatusItemStyles>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <StatusWrapper>
      <Dropdown disabled={isDisabled} overlay={menu} trigger={['click']}>
        <div>
          <TagCustom
            style={{
              backgroundColor: statusItem?.backgroundColor,
              color: statusItem?.colorText,
            }}
            className={`pointer ${isDisabled ? 'tag-status-disabled' : ''}`}
            text={statusItem?.text}
          />
          {loading && <Spin className='ml-5' />}
        </div>
      </Dropdown>
    </StatusWrapper>
  )
}

export default StatusSelect
