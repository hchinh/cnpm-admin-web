import { Brand, ListParams } from 'interfaces'
import axiosClient from './axiosClient'

const brandApi = {
  getAll(params?: ListParams): Promise<Brand[]> {
    const url = '/brands'
    return axiosClient.get(url, { params })
  },

  getById(id: number): Promise<Brand> {
    const url = `/brands/${id}`
    return axiosClient.get(url)
  },

  add(data: Brand): Promise<Brand> {
    const url = '/brands'
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.post(url, data, token)
  },

  update(data: Brand): Promise<Brand> {
    const url = `/brands/${data.id}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.put(url, data, token)
  },

  remove(id: string): Promise<Brand> {
    const url = `/brands/${id}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.delete(url, token)
  },
}

export default brandApi
