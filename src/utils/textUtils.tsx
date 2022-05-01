import { Tag } from 'antd'
import { Category, Gender } from 'interfaces'

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}

export const formatCategoryById = (categoryId: number, categoryList?: Category[]) => {
  return categoryList?.find((category) => category.id === categoryId)?.name
}

export const formatGender = (genderId: number) => {
  const genderList = [
    {
      value: Gender.MALE,
      text: 'Male',
      color: 'blue',
    },
    {
      value: Gender.FEMALE,
      text: 'Female',
      color: 'pink',
    },
    {
      value: Gender.OTHERS,
      text: 'Others',
      color: 'orange',
    },
  ]

  const gender = genderList.find((item) => item.value === genderId)

  return <Tag color={gender?.color}>{gender?.text}</Tag>
}

export const formatCustomerStatus = (enabled: number) => {
  const ACTIVE_CONST = [
    {
      value: 0,
      text: 'Inactive',
      color: 'red',
    },
    {
      value: 1,
      text: 'Active',
      color: 'green',
    },
  ]

  const status = ACTIVE_CONST.find((item) => item.value === enabled)

  return <Tag color={status?.color}>{status?.text}</Tag>
}
