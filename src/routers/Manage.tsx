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

const manageRoutes: RouteObject[] = [
    { index: true, element: <Navigate to={ROUTE_PATH.MANAGE_HOME} replace/> },
    { path: ROUTE_PATH.MANAGE_HOME, element: <Home/> },
    { path: ROUTE_PATH.MANAGE_PRODUCT_APPROVAL, element: <ProductionApproval/> },
    { path: ROUTE_PATH.MANAGE_EXCHANGE_APPROVAL, element: <ExchangeApproval/> },
    { path: ROUTE_PATH.MANAGE_COMPLETED_ORDER, element: <CompletedOrder/> },
    { path: ROUTE_PATH.MANAGE_PRODUCTION_ORDER, element: <ProductionOrder/> },
    { path: ROUTE_PATH.MANAGE_EXCHANGE_ORDER, element: <ExchangeOrder/> },
    { path: ROUTE_PATH.MANAGE_UPDATE_ORDER, element: <UpdateOrder/> },
]

export default manageRoutes;