import { Gender, ROLES } from 'interfaces'

export interface Employee {
  id?: number
  createdDate?: string
  modifiedDate?: string
  createdBy?: string
  modifiedBy?: string
  userName: string
  password: string
  name: string
  address?: string
  phoneNumber: string
  email: string
  gender: Gender
  profilePicture?: string
  enabled?: number
  roleCode: ROLES
}
