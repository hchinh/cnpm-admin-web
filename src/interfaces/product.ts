export interface Product {
  id?: number
  createdDate?: string
  modifiedDate?: string
  createdBy?: string
  modifiedBy?: string
  name: string
  brand?: string
  shortDescription?: string
  description: string
  price: number
  unitInStock: number
  thumbnail?: string
  categoryId: number
}
