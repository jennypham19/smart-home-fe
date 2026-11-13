export const RoleUser = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  APPLICATION_EMPLOYEE: 'application_employee',
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