export enum Status {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  REFUNDED = 'REFUNDED',
  CANCELLED = 'CANCELLED',
  DECLINED = 'DECLINED',
  PAID = 'PAID',
}

export enum PaymentMethod {
  CASH = 'CASH',
  PAYPAL = 'PAYPAL',
}

export interface CartItem {
  id: number
  createdDate?: string
  modifiedDate?: string
  createdBy?: string
  modifiedBy?: string
  quantity?: number
  salePrice?: number
  cartId?: number
  productId?: number
  productName?: string
  productThumbnail?: string
}

export interface Cart {
  id: number
  createdDate?: string
  modifiedDate?: string
  createdBy: string
  modifiedBy?: string
  note?: string
  totalCost: number
  address?: string
  status: Status
  paymentMethod: PaymentMethod
  cartItems: CartItem[]
  customerId: number
  customerName: string
}
