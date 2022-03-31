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
    return axiosClient.post(url, data)
  },

  update(data: Partial<Product>): Promise<Product> {
    const url = `/products/${data.id}`
    return axiosClient.patch(url, data)
  },

  remove(id: string): Promise<Product> {
    const url = `/products/${id}`
    return axiosClient.delete(url)
  },
}
export default productApi
