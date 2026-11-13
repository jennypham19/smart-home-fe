export const ROLE = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  APPLICATION_EMPLOYEE: 'application_employee',
  PRODUCTION_EMPLOYEE: 'production-employee',
  EXCHANGE_EMPLOYEE: 'exchange-employee',
};

export const permissions = {
  all: '*',
  warehouseStaff: {
    manage: 'MANAGE_INVENTORY',
    view: 'VIEW_INVENTORY',
    create: 'CREATE_INVENTORY',
    update: 'UPDATE_INVENTORY',
    delete: 'DELETE_INVENTORY',
  },
  sales: {
    manage: 'MANAGE_ORDER',
    view: 'VIEW_ORDER',
    create: 'CREATE_ORDER',
    update: 'UPDATE_ORDER',
    delete: 'DELETE_ORDER',
  },
};
