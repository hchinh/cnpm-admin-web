import { ChangePasswordPayload } from './../interfaces/auth'
import { AuthResponse, LoginPayload, LogoutPayload, RefreshTokenPayload } from 'interfaces'
import axiosClient from './axiosClient'

const authApi = {
  login(payload: LoginPayload): Promise<AuthResponse> {
    return axiosClient.post('/admin/auth/signin', payload)
  },

  logout(payload: LogoutPayload) {
    return axiosClient.post('/admin/auth/logout', payload)
  },

  checkToken(payload: RefreshTokenPayload): Promise<AuthResponse> {
    return axiosClient.post('/admin/auth/refreshtoken', payload)
  },

  changePassword(payload: ChangePasswordPayload) {
    return axiosClient.post('/password/edit', payload)
  },
}

export default authApi
