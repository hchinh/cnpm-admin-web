import { ApiResponse, ListParams, ListResponse, Product } from 'interfaces'
import axiosClient from './axiosClient'

const productApi = {
  async getAll(params: ListParams): Promise<ListResponse<Product>> {
    const data: ApiResponse<Product> = await axiosClient.get('/products', { params })

    return {
      data: data.content,
      pagination: {
        page: data.number + 1,
        limit: data.size,
        total: data.totalElements,
      },
    }
  },

  getById(id: number): Promise<Product> {
    const url = `/products/${id}`
    return axiosClient.get(url)
  },

  add(data: Product): Promise<Product> {
    const url = '/products'
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.post(url, data, token)
  },

  update(data: Product): Promise<Product> {
    const url = `/products/${data.id}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.put(url, data, token)
  },

  remove(id: string): Promise<Product> {
    const url = `/products/${id}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.delete(url, token)
  },
}
export default productApi
