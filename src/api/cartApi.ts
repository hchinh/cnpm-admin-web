import { ApiResponse, Cart, ListParams, ListResponse } from 'interfaces'
import axiosClient from './axiosClient'

const cartApi = {
  async getAll(params: ListParams): Promise<ListResponse<Cart>> {
    const data: ApiResponse<Cart> = await axiosClient.get('/carts', { params })

    return {
      data: data.content,
      pagination: {
        page: data.number + 1,
        limit: data.size,
        total: data.totalElements,
      },
    }
  },

  getById(id: number): Promise<Cart> {
    const url = `/carts/${id}`
    return axiosClient.get(url)
  },

  updateStatus(data: { status: string; userId: string | null }, cartId: number): Promise<Cart> {
    const url = `/carts/status/${cartId}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.put(url, data, token)
  },
}

export default cartApi
