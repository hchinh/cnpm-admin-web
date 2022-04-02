import { Category } from 'interfaces'

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}

export const formatCategoryById = (categoryId: number, categoryList?: Category[]) => {
  return categoryList?.find((category) => category.id === categoryId)?.name
}
