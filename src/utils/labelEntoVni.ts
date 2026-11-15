import { ORDER_STATUS_LABELS, OrderStatus, ROLE_LABELS, RoleUser } from "@/constants/status";

export const getRoleLabel = (role: RoleUser | null | undefined) : string => {
    if(!role) return "Chưa xác định";
    return ROLE_LABELS[role] || role;
}

export const getOrderStatusLabel = (status: OrderStatus | null | undefined) : string => {
    if(!status) return 'Chưa xác địnhh';
    return ORDER_STATUS_LABELS[status] || status
}

export const getStatusProductColor = (status: string | null) => {
  switch (status) {
    case 'out_of_stock':
      return { color: 'error' as const };
    case 'restocking':
      return { color: 'warning' as const };
    case 'in_stock':
    default:
      return { color: 'success' as const };
  }
};