import { COLORS } from "@/constants/colors";
import { CATEGORY_PRODUCT_STATUS_LABEL, CategoryProduct, EXCHANGE_ORDER_STATUS_LABEL, ExchangeOrderStatus, ORDER_STATUS_LABEL, OrderStatus, PRODUCT_STATUS_LABELS, ProductStatus, ROLE_LABELS, RoleUser } from "@/constants/status";

export const getRoleLabel = (role: RoleUser | null | undefined) : string => {
    if(!role) return "Chưa xác định";
    return ROLE_LABELS[role] || role;
}

export const getProductStatusLabel = (status: ProductStatus | null | undefined) : string => {
    if(!status) return 'Chưa xác địnhh';
    return PRODUCT_STATUS_LABELS[status] || status
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

export const getCategoryProductLabel = (category: CategoryProduct | null | undefined) : string => {
    if(!category) return 'Chưa xác địnhh';
    return CATEGORY_PRODUCT_STATUS_LABEL[category] || category
}

export const getOrderStatusLabel = (status: OrderStatus | null | undefined) : string => {
    if(!status) return 'Chưa xác địnhh';
    return ORDER_STATUS_LABEL[status] || status
}

export const getOrderStatusColor = (status: string | null) => {
  switch (status) {
    case OrderStatus.REJECTED || OrderStatus.MANAGER_REJECTED:
      return { color: 'error' as const };
    case OrderStatus.PENDING_PRODUCTION:
      return { color: 'warning' as const };
    case OrderStatus.PENDING_MANAGER_APPROVAL:
      return { color: 'warning' as const };
    case OrderStatus.IN_PRODUCTION: 
      return { color: 'primary' as const}
    case OrderStatus.PRODUCTION_COMPLETED:
    default:
      return { color: 'success' as const };
  }
};

export const getExchangeOrderStatusLabel = (status: ExchangeOrderStatus | null | undefined) : string => {
    if(!status) return 'Chưa xác địnhh';
    return EXCHANGE_ORDER_STATUS_LABEL[status] || status
}

export const getExchangeOrderStatusColor = (status: string | null) => {
  switch (status) {
    case ExchangeOrderStatus.CANCELLED:
      return { color: 'error' as const };
    case ExchangeOrderStatus.DELIVERY_FAILED:
      return { color: 'error' as const };
    case ExchangeOrderStatus.PENDING_APPROVAL:
      return { color: 'warning' as const };
    case ExchangeOrderStatus.AWAITING_PICKUP:
      return { color: 'warning' as const };
    case ExchangeOrderStatus.DELIVERED: 
      return { color: 'primary' as const}
    case ExchangeOrderStatus.PICKED_UP: 
      return { color: 'primary' as const}
    case ExchangeOrderStatus.OUT_OF_DELIVERY:
    default:
      return { color: 'success' as const };
  }
};