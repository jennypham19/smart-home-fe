import type { HttpResponse } from '@/types/common';
import HttpClient from '@/utils/HttpClient';
import { GetParams, PaginatedResponse } from './base-service';
import { ProductPayload } from '@/types/product';
import { IOrder, OrderPayload } from '@/types/order';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/orders`;

// API sinh mã đơn hàng
export const handleGenerateOrderCode = () => {
  return HttpClient.get<HttpResponse<{success: boolean, data: any}>>(`${prefix}/generate-order-code`);
};

// Tạo thông tin đơn hàng + sản phẩm
export const createOrder = async(payload: OrderPayload) => {
  return HttpClient.post(`${prefix}/order-with-products-created`, payload)
}

// Lấy danh sách 
export const getOrders = async<T>(getParams: GetParams) : Promise<HttpResponse<PaginatedResponse<T>>>=> {
  const url = `${prefix}/list-orders-with-products`;
  const params: Record<string, any> = {
    page: getParams.page,
    limit: getParams.limit,
  }
  if(getParams.searchTerm && getParams.searchTerm.trim()) {
    params.searchTerm = getParams.searchTerm
  };
  const response = await HttpClient.get<{
    success: boolean,
    message: string,
    data: PaginatedResponse<T>
  }>(url, { params });
  
  if(response.data && response.success && response.data){
    return response;
  }else{
    throw new Error(response.message || 'Failed to fetch list user');
  }
}

// Lấy danh sách đơn hàng cho nhân viên sản xuất: nhóm theo 3 trạng thái + tổng số lượng từng trạng thái
export const getListOrdersForProductionEmployee = () => {
  return HttpClient.get<any, HttpResponse<any>>(`${prefix}/list-orders-for-production-employee`);
}