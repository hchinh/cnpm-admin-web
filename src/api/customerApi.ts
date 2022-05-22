import { ApiResponse, Customer, ListParams, ListResponse } from 'interfaces'
import axiosClient from './axiosClient'

const customerApi = {
  async getAll(params: ListParams): Promise<ListResponse<Customer>> {
    const data: ApiResponse<Customer> = await axiosClient.get('/customers', { params })

    return {
      data: data.content,
      pagination: {
        page: data.number + 1,
        limit: data.size,
        total: data.totalElements,
      },
    }
  },

  getById(id: number): Promise<Customer> {
    const url = `/customers/${id}`
    return axiosClient.get(url)
  },

  remove(id: string): Promise<Customer> {
    const url = `/customers/${id}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.delete(url, token)
  },
}
export default customerApi
