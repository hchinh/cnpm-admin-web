import { ReportParams } from 'interfaces'
import axiosClient from './axiosClient'

const reportApi = {
  getRevenueReport(params: ReportParams) {
    return axiosClient.get('/statistics/revenue', { params })
  },

  getProductReport(params: ReportParams) {
    return axiosClient.get('/statistics/product', { params })
  },
}

export default reportApi
