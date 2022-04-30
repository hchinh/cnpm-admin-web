import { Category, ListParams } from 'interfaces'
import axiosClient from './axiosClient'

const categoryApi = {
  getAll(params?: ListParams): Promise<Category[]> {
    const url = '/categories'
    return axiosClient.get(url, { params })
  },

  getById(id: number): Promise<Category> {
    const url = `/categories/${id}`
    return axiosClient.get(url)
  },

  add(data: Category): Promise<Category> {
    const url = '/categories'
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.post(url, data, token)
  },

  update(data: Category): Promise<Category> {
    const url = `/categories/${data.id}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.put(url, data, token)
  },

  remove(id: string): Promise<Category> {
    const url = `/categories/${id}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.delete(url, token)
  },
}
export default categoryApi
