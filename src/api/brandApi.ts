import { Brand } from 'interfaces'
import axiosClient from './axiosClient'

const brandApi = {
  getAll(): Promise<Brand[]> {
    const url = '/brands'
    return axiosClient.get(url)
  },
}

export default brandApi
