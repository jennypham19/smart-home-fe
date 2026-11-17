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
// Lấy toàn bộ đơn hàng theo trạng thái pending_manager_approval cho role quản lý (Có phân trang)
export const getOrdersPaginatedWithStatusPendingManagerApproval = async(getParams: GetParams) : Promise<HttpResponse<PaginatedResponse<IOrder>>>=> {
  const url = `${prefix}/orders-paginated-with-status-pending-manager-approval`;
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
    data: PaginatedResponse<IOrder>
  }>(url, { params });
  
  if(response.data && response.success && response.data){
    return response;
  }else{
    throw new Error(response.message || 'Failed to fetch list user');
  }
}

// Lấy toàn bộ đơn hàng theo trạng thái pending_manager_approval cho role quản lý (không phân trang)
export const getOrdersWithStatusPendingManagerApproval = () => {
  return HttpClient.get<any, HttpResponse<IOrder[]>>(`${prefix}/orders-with-status-pending-manager-approval`)
}

// Lấy danh sách đơn hàng cho nhân viên sản xuất: nhóm theo 3 trạng thái + tổng số lượng từng trạng thái
export const getListOrdersForProductionEmployee = () => {
  return HttpClient.get<any, HttpResponse<any>>(`${prefix}/list-orders-for-production-employee`);
}



// Lấy danh sách chi tiết đơn hàng theo id
export const getDetailOrdersWithProducts = (id: string) => {
  return HttpClient.get<any, HttpResponse<IOrder>>(`${prefix}/detail-orders-with-products/${id}`)
}

// Tick/untick 1 sản phẩm trong đơn.
// BE tự trừ/hoàn tồn kho, đổi status, chặn khi hết hàng và trả về order đã cập nhật.
export const updateProductChecked = (productId: string, isChecked: boolean) => {
  return HttpClient.patch<{ isChecked: boolean }, HttpResponse<IOrder>>(
    `${prefix}/products/${productId}/checked`,
    { isChecked },
  );
}

// Hoàn thành đơn hàng
export const completedOrder = (id: string, status: string) => {
  return HttpClient.patch<{ status: string}, HttpResponse<IOrder>>(
    `${prefix}/order-completed/${id}`, { status }
  )
}

// Gửi duyệt đơn hàng
export const sendApprovalOrder = (id: string, status: string) => {
  return HttpClient.patch<{ status: string}, HttpResponse<IOrder>>(
    `${prefix}/order-sent-approval/${id}`, { status }
  )
}

// Lấy toàn bộ đơn hàng theo trạng thái pending_approval (không phân trang)
export const getAllProductionOrderWithStatus = () => {
  return HttpClient.get<any, HttpResponse<IOrder[]>>(`${prefix}/list-production-orders-with-status`)
}

// Gửi duyệt lên quản lý
export const sendApprovalOrderToManager = (id: string, status: string) => {
  return HttpClient.patch<{ status: string }, HttpResponse>(`${prefix}/order-sent-approval-to-manager/${id}`, { status })
}

// Duyệt bởi nhân viên tạo đơn
export const approvedByAppEmployee = (id: string, status: string) => {
  return HttpClient.patch<{ status: string }, HttpResponse>(`${prefix}/order-approved-by-app-employee/${id}`, { status })
}

// Duyệt bởi quản lý
export const approvedByManager = (id: string, status: string) => {
  return HttpClient.patch<{ status: string }, HttpResponse>(`${prefix}/order-approved-by-manager/${id}`, { status })
}