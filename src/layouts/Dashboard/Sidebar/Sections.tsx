import { TFunction } from 'i18next';

import type { SvgIconComponent } from '@mui/icons-material';
import { HomeOutlined, PeopleOutline, PeopleOutlined } from '@mui/icons-material';

import { ROUTE_PATH } from '@/constants/routes';
import { ROLE } from '@/constants/roles';

export interface SectionItem {
  title: string;
  path: string;
  children?: SectionItem[];
  info?: () => JSX.Element;
  icon?: SvgIconComponent;
}

interface Section {
  section: string | null;
  items: SectionItem[];
}

// const Sections = (t: TFunction): Section[] => {
//   return AdminSections(t);
// };
// const AdminSections = (t: TFunction): Section[] => [
//   {
//     section: null,
//     items: [
//       {
//         title: t('home'),
//         path: ROUTE_PATH.MANAGE_HOME,
//         icon: HomeOutlined,
//       },
//     ],
//   },
// ];

// export default Sections;

// sidebar của admin
const AdminSidebars = (): Section[] => [
  {
    section: null,
    items: [
      {
        title: 'Trang chủ',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_HOME}`,
        icon: HomeOutlined        
      },
      {
        title: 'Sản phẩm',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_PRODUCT}`,
        icon: HomeOutlined
      }
    ]
  }
]

// sidebar của quản lý
const ManagerSidebars = (): Section[] => [
  {
    section: null,
    items: [
      {
        title: 'Trang chủ',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_HOME}`,
        icon: HomeOutlined        
      },
      {
        title: 'Duyệt sản xuất',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_PRODUCT_APPROVAL}`,
        icon: HomeOutlined        
      },
      {
        title: 'Duyệt giao nhận',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_EXCHANGE_APPROVAL}`,
        icon: HomeOutlined        
      },
      {
        title: 'Đơn hoàn thành',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_COMPLETED_ORDER}`,
        icon: HomeOutlined        
      }
    ]
  }
]

// sidebar của nhân viên nhập đơn
const ApplicationEmployeeSidebars = (): Section[] => [
  {
    section: null,
    items: [
      {
        title: 'Trang chủ',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_HOME}`,
        icon: HomeOutlined        
      },
      {
        title: 'Đơn sản xuất',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_PRODUCTION_ORDER}`,
        icon: HomeOutlined        
      },
      {
        title: 'Đơn giao nhận',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_EXCHANGE_ORDER}`,
        icon: HomeOutlined        
      },
      {
        title: 'Sản phẩm',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_PRODUCT}`,
        icon: HomeOutlined
      }
    ]
  }
]

// sidebar của nhân viên sản xuất
const ProductionEmployeeSidebars = (): Section[] => [
  {
    section: null,
    items: [
      {
        title: 'Trang chủ',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_HOME}`,
        icon: HomeOutlined        
      },
      {
        title: 'Đơn tiếp nhận',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_RECEIVED_ORDER}`,
        icon: HomeOutlined        
      },
      {
        title: 'Quản lý đóng hàng',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_PACKING_MANAGEMENT}`,
        icon: HomeOutlined        
      },
      {
        title: 'Sản phẩm',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_PRODUCT}`,
        icon: HomeOutlined
      }
    ]
  }
]

// sidebar của nhân viên nhập đơn
const ExchangeEmployeeSidebars = (): Section[] => [
  {
    section: null,
    items: [
      {
        title: 'Trang chủ',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_HOME}`,
        icon: HomeOutlined        
      },
      {
        title: 'Đơn giao nhận',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_EXCHANGE_ORDER}`,
        icon: HomeOutlined        
      },
      {
        title: 'Cập nhật đơn',
        path: `${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_UPDATE_ORDER}`,
        icon: HomeOutlined        
      }
    ]
  }
]

// sidebar
const Sidebars = (role: string) => {
  switch (role) {
    case ROLE.MANAGER:
      return ManagerSidebars()
    case ROLE.APPLICATION_EMPLOYEE:
      return ApplicationEmployeeSidebars()
      case ROLE.PRODUCTION_EMPLOYEE:
        return ProductionEmployeeSidebars()
      case ROLE.EXCHANGE_EMPLOYEE:
        return ExchangeEmployeeSidebars()
      case ROLE.ADMIN:
      default:
        return AdminSidebars()
  }
};

export default Sidebars