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
