export enum Gender {
  MALE,
  FEMALE,
  OTHERS,
}

export interface Customer {
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
}
