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
}

export default cartApi
