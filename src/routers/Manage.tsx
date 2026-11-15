import Loadable from "@/components/Loadable";
import { ROUTE_PATH } from "@/constants/routes";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Home = Loadable(lazy(() => import('@/views/Manage/Dashboard/index')));
const ProductionApproval = Loadable(lazy(() => import('@/views/Manage/Manager/ProductionApproval/index')));
const ExchangeApproval = Loadable(lazy(() => import('@/views/Manage/Manager/ExchangeApproval/index')));
const CompletedOrder = Loadable(lazy(() => import('@/views/Manage/Manager/CompletedOrder/index')));
const ProductionOrder = Loadable(lazy(() => import('@/views/Manage/ProductionOrder/index')));
const ExchangeOrder = Loadable(lazy(() => import('@/views/Manage/ExchangeOrder/index')));
const UpdateOrder = Loadable(lazy(() => import('@/views/Manage/UpdateOrder/index')));
const Product = Loadable(lazy(() => import('@/views/Manage/Product/index')));

const manageRoutes: RouteObject[] = [
    { index: true, element: <Navigate to={ROUTE_PATH.MANAGE_HOME} replace/> },
    { path: ROUTE_PATH.MANAGE_HOME, element: <Home/> },
    { path: ROUTE_PATH.MANAGE_PRODUCT, element: <Product/> },
    { path: ROUTE_PATH.MANAGE_PRODUCT_APPROVAL, element: <ProductionApproval/> }, // duyệt sản xuất
    { path: ROUTE_PATH.MANAGE_EXCHANGE_APPROVAL, element: <ExchangeApproval/> }, // duyệt giao nhận
    { path: ROUTE_PATH.MANAGE_COMPLETED_ORDER, element: <CompletedOrder/> }, // đơn hoàn thành
    { path: ROUTE_PATH.MANAGE_PRODUCTION_ORDER, element: <ProductionOrder/> }, // đơn sản xuất
    { path: ROUTE_PATH.MANAGE_EXCHANGE_ORDER, element: <ExchangeOrder/> }, // đơn giao nhận
    { path: ROUTE_PATH.MANAGE_UPDATE_ORDER, element: <UpdateOrder/> }, 
]

export default manageRoutes;