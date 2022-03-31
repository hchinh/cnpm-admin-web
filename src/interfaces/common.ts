export enum ROLES {
  EMPLOYEE = 'ROLE_EMPLOYEE',
  ADMIN = 'ROLE_ADMIN',
}

export interface AuthResponse {
  id: string
  username: string
  email: string
  token: string
  type: 'Bearer'
  role: ROLES
}
