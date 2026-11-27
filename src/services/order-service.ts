import type { HttpResponse } from '@/types/common';
import HttpClient from '@/utils/HttpClient';
import { GetParams, PaginatedResponse } from './base-service';
import { ProductPayload } from '@/types/product';
import { BodyPayload, IExchangeOrder, IOrder, OrderPayload } from '@/types/order';

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

// Lấy danh sách đơn hàng sản xuất theo trạng thái đã duyệt, chờ sản xuất, đang sản xuất, đã sản xuất, bị từ chối
export const getOrdersWithStatus = async(getParams: GetParams) : Promise<HttpResponse<PaginatedResponse<IOrder>>>=> {
  const url = `${prefix}/list-orders-with-status`;
  const params: Record<string, any> = {
    page: getParams.page,
    limit: getParams.limit,
  }
  if(getParams.searchTerm && getParams.searchTerm.trim()) {
    params.searchTerm = getParams.searchTerm
  };
  if(getParams.status !== 'all'){
    params.status = getParams.status
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

// Lấy danh sách chờ tiếp nhận
export const getReceivedOrders = async(getParams: GetParams) : Promise<HttpResponse<PaginatedResponse<IOrder>>>=> {
  const url = `${prefix}/list-received-orders`;
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

// Lấy danh sách chờ tiếp nhận
export const getReceivedExchangeOrders = async(getParams: GetParams) : Promise<HttpResponse<PaginatedResponse<IExchangeOrder>>>=> {
  const url = `${prefix}/list-received-exchange-orders`;
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
    data: PaginatedResponse<IExchangeOrder>
  }>(url, { params });
  
  if(response.data && response.success && response.data){
    return response;
  }else{
    throw new Error(response.message || 'Failed to fetch list user');
  }
}

// Lấy danh sách đơn hàng giao nhận có trạng thái pending_approval (Chờ phê duyệt)
export const getListExchangeOrderWithPendingApproval = async(getParams: GetParams) : Promise<HttpResponse<PaginatedResponse<IExchangeOrder>>>=> {
  const url = `${prefix}/exchange-orders-with-pending-approval`;
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
    data: PaginatedResponse<IExchangeOrder>
  }>(url, { params });
  
  if(response.data && response.success && response.data){
    return response;
  }else{
    throw new Error(response.message || 'Failed to fetch list user');
  }
}

// Lấy danh sách đơn hàng giao nhận có trạng thái pending_approval (Chờ phê duyệt)
export const getListExchangeOrders = async(getParams: GetParams) : Promise<HttpResponse<PaginatedResponse<IExchangeOrder>>>=> {
  const url = `${prefix}/exchange-orders`;
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
    data: PaginatedResponse<IExchangeOrder>
  }>(url, { params });
  
  if(response.data && response.success && response.data){
    return response;
  }else{
    throw new Error(response.message || 'Failed to fetch list user');
  }
}

// Lấy danh sách đơn hàng giao nhận chờ lấy hàng
export const getListExchangeOrdersWithAwaitingPickup = async(getParams: GetParams) : Promise<HttpResponse<PaginatedResponse<IExchangeOrder>>>=> {
  const url = `${prefix}/exchange-orders-with-awaiting-pickup`;
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
    data: PaginatedResponse<IExchangeOrder>
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
export const getListOrdersForProductionEmployee = (id: string) => {
  return HttpClient.get<any, HttpResponse<any>>(`${prefix}/list-orders-for-production-employee/${id}`);
}



// Lấy danh sách chi tiết đơn hàng theo id
export const getDetailOrdersWithProducts = (id: string) => {
  return HttpClient.get<any, HttpResponse<IOrder>>(`${prefix}/detail-orders-with-products/${id}`)
}

// Cập nhật trạng thái giao hàng theo từng bước (tick vòng tròn / nút Thành công - Thất bại).
// Bước 2, 3: không cần result. Bước cuối: result = 'success' (Thành công) | 'failed' (Thất bại).
// BE tự xác định trạng thái kế tiếp và trả về DeliveryOrder đã cập nhật.
export const updateDeliveryStatusByStep = (
  deliveryOrderId: string,
  result?: 'success' | 'failed',
) => {
  return HttpClient.patch<{ result?: 'success' | 'failed' }, HttpResponse<IExchangeOrder>>(
    `${prefix}/delivery-orders/${deliveryOrderId}/status`,
    result ? { result } : {},
  );
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
export const approvedByManager = (id: string, payload: {status: string, approvedBy: string }) => {
  return HttpClient.patch<HttpResponse>(`${prefix}/order-approved-by-manager/${id}`, payload as any)
}

// Chỉnh sửa lại đơn hàng
export const updateOrderWithProduct = async(id: string, payload: OrderPayload) => {
    return HttpClient.put(`${prefix}/order-with-products-updated/${id}`, payload as any);
}

// Tạo thông tin đơn hàng giao nhận
export const createOrderShipping = async(payload: BodyPayload) => {
  return HttpClient.post(`${prefix}/order-shipping-created`, payload)
}

// Tiếp nhận đơn hàng
export const receivedOrderByProEmployee = (orderId: string, payload: { userId: string, status: string }) => {
  return HttpClient.patch<HttpResponse>(`${prefix}/order-received-by-pro-employee/${orderId}`, payload as any)
}

// Tiếp nhận đơn hàng giao 
export const receivedOrderByExchangeEmployee = (orderId: string, payload: { userId: string, status: string }) => {
  return HttpClient.patch<HttpResponse>(`${prefix}/order-received-by-exchange-employee/${orderId}`, payload as any)
}

// Xóa đơn hàng ở trạng thái chờ quản lý duyệt
export const deleteOrderWithStatusPendingManagerApproval = (id: string) => {
  return HttpClient.delete(`${prefix}/order-with-status-pending-manager-approval-deleted/${id}`);
}

// Duyệt đơn giao nhận bởi quản lý
export const approvedExchangeOrderByManager = (id: string, payload: {status: string, approvedBy: string }) => {
  return HttpClient.patch<HttpResponse>(`${prefix}/exchange-order-approved-by-manager/${id}`, payload as any)
}