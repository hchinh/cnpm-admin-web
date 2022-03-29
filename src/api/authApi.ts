import { LoginPayload } from 'interfaces'
import axiosClient from './axiosClient'

const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post('/admin/auth/signin', payload)
  },
}

export default authApi
