export const RoleUser = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  APPLICATION_EMPLOYEE: 'application-employee',
  PRODUCTION_EMPLOYEE: 'production-employee',
  EXCHANGE_EMPLOYEE: 'exchange-employee',
};

export type RoleUser = typeof RoleUser[keyof typeof RoleUser];

export const ROLE_LABELS: { [key in RoleUser]: string } = {
    [RoleUser.ADMIN]: 'Admin',
    [RoleUser.MANAGER]: 'Quản lý',
    [RoleUser.APPLICATION_EMPLOYEE]: 'Nhân viên nhập đơn',
    [RoleUser.PRODUCTION_EMPLOYEE]: 'Nhân viên sản xuất',
    [RoleUser.EXCHANGE_EMPLOYEE]: 'Nhân viên giao nhận',

}

export const ProductStatus = {
  IN_STOCK: 'in_stock',
  OUT_OF_STOCK: 'out_of_stock',
  RESTOCKING :"restocking"
}

export type ProductStatus = typeof ProductStatus[keyof typeof ProductStatus];

export const PRODUCT_STATUS_LABELS: { [key in ProductStatus]: string } = {
    [ProductStatus.IN_STOCK]: 'Còn hàng',
    [ProductStatus.OUT_OF_STOCK]: 'Hết hàng',
    [ProductStatus.RESTOCKING]: 'Chờ nhập hàng',
}

export const CategoryProduct = {
  SMART_DEVICE: 'smart_device',
  ACCESSORY: 'accessory'
}

export type CategoryProduct = typeof CategoryProduct[keyof typeof CategoryProduct];

export const CATEGORY_PRODUCT_STATUS_LABEL: { [key in CategoryProduct]: string } = {
  [CategoryProduct.SMART_DEVICE]: 'Thiết bị điện tử',
  [CategoryProduct.ACCESSORY]: 'Phụ kiện'
}

export const OrderStatus = {
  PENDING_PRODUCTION: 'pending_production',
  IN_PRODUCTION: 'in_production',
  PRODUCTION_COMPLETED: 'production_completed',
  PENDING_APPROVAL: 'pending_approval',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PENDING_MANAGER_APPROVAL: 'pending_manager_approval',
  MANAGER_APPROVED: 'manager_approved',
  MANAGER_REJECTED: 'manager_rejected'
}

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export const ORDER_STATUS_LABEL: { [key in OrderStatus]: string } = {
  [OrderStatus.PENDING_PRODUCTION]: "Chờ sản xuất",
  [OrderStatus.IN_PRODUCTION]: "Đang sản xuất",
  [OrderStatus.PRODUCTION_COMPLETED]: "Đã sản xuất",
  [OrderStatus.PENDING_APPROVAL]: 'Chờ duyệt',
  [OrderStatus.APPROVED]: "Đã duyệt",
  [OrderStatus.REJECTED]: 'Từ chối',
  [OrderStatus.PENDING_MANAGER_APPROVAL]: 'Chờ quản lý duyệt',
  [OrderStatus.MANAGER_APPROVED]: 'Quản lý duyệt',
  [OrderStatus.MANAGER_REJECTED]: 'Quản lý từ chối'
}

export const ExchangeOrderStatus = {
  PENDING_APPROVAL: 'pending_approval',
  AWAITING_PICKUP: 'awaiting_pickup',
  PICKED_UP: 'picked_up',
  OUT_OF_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  DELIVERY_FAILED: 'delivery_failed',
  CANCELLED: 'cancelled',
  REJECTED: 'rejected'
}

export type ExchangeOrderStatus = typeof ExchangeOrderStatus[keyof typeof ExchangeOrderStatus];

export const EXCHANGE_ORDER_STATUS_LABEL: { [key in ExchangeOrderStatus]: string} = {
  [ExchangeOrderStatus.PENDING_APPROVAL]: "Chờ phê duyệt",
  [ExchangeOrderStatus.AWAITING_PICKUP]: "Chờ lấy hàng",
  [ExchangeOrderStatus.PICKED_UP]: "Đã lấy hàng",
  [ExchangeOrderStatus.OUT_OF_DELIVERY]: "Đang giao",
  [ExchangeOrderStatus.DELIVERED]: "Đã giao",
  [ExchangeOrderStatus.DELIVERY_FAILED]: "Giao thất bại",
  [ExchangeOrderStatus.CANCELLED]: "Đã hủy",
  [ExchangeOrderStatus.REJECTED]: "Bị từ chối"
}