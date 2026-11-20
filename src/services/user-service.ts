import type { HttpResponse } from '@/types/common';
import { IUser, UserPayload, UserUpdatePayload } from '@/types/user';
import HttpClient from '@/utils/HttpClient';
import { PaginatedResponse } from './base-service';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'; 
const prefix = `${API_BASE_URL}/api/users`;

export interface GetParams{
  page: number;
  limit: number;
  role?: string;
  searchTerm?: string;
}

// Tạo tài khoản
export const createAccount = async(payload: UserPayload) => {
  return HttpClient.post(`${prefix}/user-account-created`, payload)
}

// Chỉnh sửa tài khoản
export const updateAccount = async(id: string, payload: UserUpdatePayload) => {
    return HttpClient.put(`${prefix}/user-account-updated/${id}`, payload as any);
}

// Xóa tài khoản, cập nhật is_deleted = -1
export const deleteAccount = (id: string) => {
  return HttpClient.patch(`${prefix}/user-account-deleted/${id}`)
}

// Lấy danh sách 
export const getAccounts = async<T>(getParams: GetParams) : Promise<HttpResponse<PaginatedResponse<T>>>=> {
  const url = `${prefix}/get-list-accounts`;
  const params: Record<string, any> = {
    page: getParams.page,
    limit: getParams.limit,
  }
  if(getParams.role !== 'all'){
    params.role = getParams.role
  };
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

// Reset mật khẩu
export const resetPassword = async(id: string) => {
  return HttpClient.patch(`${prefix}/account-reset-password/${id}`)
}

// Thay đổi mật khẩu
export const changePassword = (id: string, password: string) => {
  return HttpClient.patch<{ password: string }, HttpResponse>(`${prefix}/password-changed/${id}`, { password })
}

