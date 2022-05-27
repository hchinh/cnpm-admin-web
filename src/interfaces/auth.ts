export interface LoginPayload {
  userName: string
  password: string
}

export interface RefreshTokenPayload {
  refreshToken: string
}

export interface LogoutPayload {
  refreshToken: string
  token: string
  userId: number
}

export interface ChangePasswordPayload {
  email: string
  oldPassword: string
  password: string
}
