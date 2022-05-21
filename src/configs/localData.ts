import { Gender, PaymentMethod, ROLES, Status } from 'interfaces'

export const ORDER_STATUS = [
  {
    value: Status.PENDING,
    text: 'Pending',
    color: 'orange',
    colorText: '#fa8c16',
    backgroundColor: '#fff7e6',
  },
  {
    value: Status.REFUNDED,
    text: 'Refunded',
    color: 'blue',
    colorText: '#1890ff',
    backgroundColor: '#e6f7ff',
  },
  {
    value: Status.COMPLETED,
    text: 'Completed',
    color: 'green',
    colorText: '#52c41a',
    backgroundColor: '#f6ffed',
  },
  {
    value: Status.PAID,
    text: 'Paid',
    color: 'pink',
    colorText: '#F75D81',
    backgroundColor: '#ffefff',
  },
  {
    value: Status.CANCELLED,
    text: 'Cancelled',
    color: 'violet',
    colorText: '#665ca7',
    backgroundColor: '#e0e0ff',
  },
  {
    value: Status.DECLINED,
    text: 'Declined',
    color: 'limeGreen',
    colorText: '#4fcea2',
    backgroundColor: '#dffef2',
  },
]

export const ACTIVE_CONST = [
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

export const PAYMENT_TYPES_CONST = [
  {
    value: PaymentMethod.CASH,
    text: 'Pay by Cash',
    color: 'green',
  },
  {
    value: PaymentMethod.PAYPAL,
    text: 'Pay by Paypal',
    color: 'blue',
  },
]

export const GENDER_CONST = [
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

export const ROLES_CONST = [
  {
    value: ROLES.ADMIN,
    text: 'Admin',
    color: 'blue',
  },
  {
    value: ROLES.EMPLOYEE,
    text: 'Employee',
    color: 'cyan',
  },
]
