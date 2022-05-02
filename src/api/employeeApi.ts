import { ApiResponse, Employee, ListParams, ListResponse } from 'interfaces'
import axiosClient from './axiosClient'

const employeeApi = {
  async getAll(params: ListParams): Promise<ListResponse<Employee>> {
    const data: ApiResponse<Employee> = await axiosClient.get('/employees', { params })

    return {
      data: data.content,
      pagination: {
        page: data.number + 1,
        limit: data.size,
        total: data.totalElements,
      },
    }
  },

  getById(id: number): Promise<Employee> {
    const url = `/employees/${id}`
    return axiosClient.get(url)
  },

  add(data: Employee): Promise<Employee> {
    const url = '/employees'
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.post(url, data, token)
  },

  update(data: Employee): Promise<Employee> {
    const url = `/employees/${data.id}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.put(url, data, token)
  },

  remove(id: string): Promise<Employee> {
    const url = `/employees/${id}`
    const token = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    return axiosClient.delete(url, token)
  },
}
export default employeeApi
