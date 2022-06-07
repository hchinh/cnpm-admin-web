import { ReportParams } from 'interfaces'
import axiosClient from './axiosClient'

const reportApi = {
  getRevenue(params?: ReportParams): Promise<number> {
    return axiosClient.get('/statistics/revenue', { params })
  },

  getTotalSales(params?: ReportParams): Promise<number> {
    return axiosClient.get('/statistics/totalSales', { params })
  },

  getTotalOrders(params?: ReportParams): Promise<number> {
    return axiosClient.get('/statistics/totalOrders', { params })
  },

  getTotalCustomer(params?: ReportParams): Promise<number> {
    return axiosClient.get('/customers/count', { params })
  },

  getTopProduct(params?: ReportParams): Promise<any[]> {
    return axiosClient.get('/statistics/product', { params })
  },

  getCategoriesStatistics(year?: string): Promise<any[]> {
    return axiosClient.get('/statistics/categories/data', { params: year })
  },
}

export default reportApi
