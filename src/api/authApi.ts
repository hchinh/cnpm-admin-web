import { AuthResponse, LoginPayload } from 'interfaces'
import axiosClient from './axiosClient'

const authApi = {
  login(payload: LoginPayload): Promise<AuthResponse> {
    return axiosClient.post('/admin/auth/signin', payload)
  },
}

export default authApi
