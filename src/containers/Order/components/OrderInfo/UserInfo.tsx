import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import customerApi from 'api/customerApi'
import { Cart, Customer } from 'interfaces'
import { FC, useEffect, useMemo, useState } from 'react'

interface Props {
  record: Cart
}

const UserInfo: FC<Props> = ({ record }) => {
  const [customer, setCustomer] = useState<Customer>()

  const customerId = useMemo(() => record.customerId, [record])

  useEffect(() => {
    ;(async () => {
      if (customerId) {
        const data = await customerApi.getById(customerId)
        setCustomer(data)
      }
    })()
  }, [customerId])

  return (
    <div className='div-info-customer'>
      <Avatar
        icon={<UserOutlined />}
        src={
          customer?.profilePicture
            ? `data:image/jpeg;base64,${customer?.profilePicture}`
            : 'default-avatar.jpeg'
        }
        size={150}
      />
      <div className='name-info'>
        <span className='name-customer'>{customer?.name || 'N/A'}</span>
      </div>
      <div className='info-email'>
        <MailOutlined />
        <span className='email-customer'>{customer?.email || 'N/A'}</span>
      </div>
      <div className='info-email'>
        <PhoneOutlined />
        <span className='email-customer'>{customer?.phoneNumber}</span>
      </div>
    </div>
  )
}

export default UserInfo
