import { Tag } from 'antd'
import {
  ACTIVE_CONST,
  GENDER_CONST,
  ORDER_STATUS,
  PAYMENT_TYPES_CONST,
  ROLES_CONST,
} from 'configs/localData'
import { CartItem, Category } from 'interfaces'
import moment from 'moment'

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}

export const formatCategoryById = (categoryId: number, categoryList?: Category[]) => {
  return categoryList?.find((category) => category.id === categoryId)?.name
}

export const formatRole = (roleCode: string) => {
  const role = ROLES_CONST.find((item) => item.value === roleCode)
  return <Tag color={role?.color}>{role?.text}</Tag>
}

export const formatGender = (genderId: number) => {
  const gender = GENDER_CONST.find((item) => item.value === genderId)
  return <Tag color={gender?.color}>{gender?.text}</Tag>
}

export const formatCustomerStatus = (enabled: number) => {
  const status = ACTIVE_CONST.find((item) => item.value === enabled)
  return <Tag color={status?.color}>{status?.text}</Tag>
}

export const formatPaymentType = (paymentType: string) => {
  const payType = PAYMENT_TYPES_CONST.find((item) => item.value === paymentType)
  return <Tag color={payType?.color}>{payType?.text}</Tag>
}

export const calculateTotalItems = (cartItems: CartItem[]) => {
  return `${cartItems.length} item${cartItems.length > 1 ? 's' : ''}`
}

export const formatDate = (text?: string) => {
  if (!text) return null
  const dateTime = moment(text)
  let formatTime = 'h:mma'
  if (dateTime.minutes() === 0) formatTime = 'ha'
  return dateTime.isSame(moment(), 'year')
    ? dateTime.format(`MMM D, ${formatTime}`)
    : dateTime.format(`MMM D YYYY, ${formatTime}`)
}

export const formatOrderStatus = (data?: string) => {
  if (!data) return null
  const restItem = ORDER_STATUS.find((item) => item.value === data)
  return <Tag color={restItem?.color}>{restItem?.text ? restItem.text : data}</Tag>
}

export const formatMoneySymbol = (num?: number | string, digits = 3) => {
  if (!num) return '0'

  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i
  for (i = si.length - 1; i > 0; i--) {
    if (Math.abs(Number(num)) >= si[i].value) {
      break
    }
  }
  const resNum =
    (Math.abs(Number(num)) / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
  return num < 0 ? `-${resNum}` : resNum
}
