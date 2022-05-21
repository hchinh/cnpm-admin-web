import { Tag } from 'antd'
import { ACTIVE_CONST, GENDER_CONST, PAYMENT_TYPES_CONST, ROLES_CONST } from 'configs/localData'
import { Category } from 'interfaces'
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

export const formatDate = (text?: string) => {
  if (!text) return null
  const dateTime = moment(text)
  let formatTime = 'h:mma'
  if (dateTime.minutes() === 0) formatTime = 'ha'
  return dateTime.isSame(moment(), 'year')
    ? dateTime.format(`MMM D, ${formatTime}`)
    : dateTime.format(`MMM D YYYY, ${formatTime}`)
}
