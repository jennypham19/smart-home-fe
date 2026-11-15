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

export const OrderStatus = {
  IN_STOCK: 'in_stock',
  OUT_OF_STOCK: 'out_of_stock',
  RESTOCKING :"restocking"
}

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export const ORDER_STATUS_LABELS: { [key in OrderStatus]: string } = {
    [OrderStatus.IN_STOCK]: 'Còn hàng',
    [OrderStatus.OUT_OF_STOCK]: 'Hết hàng',
    [OrderStatus.RESTOCKING]: 'Chờ nhập hàng',

}