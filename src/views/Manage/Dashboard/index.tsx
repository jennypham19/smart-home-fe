import { ROLE } from "@/constants/roles";
import useAuth from "@/hooks/useAuth";
import DashboardAdmin from "../Admin/Dashboard";
import DashboardManager from "../Manager/Dashboard";
import DashboardExchangeEmployee from "../ExchangeEmployee/Dashboard";
import DashboardProductionEmployee from "../ProductionEmployee/Dashboard";
import DashboardApplicationEmployee from "../ApplicationEmployee/Dashboard";
import Page from "@/components/Page";

const DashboardManagement = () => {
    const { profile } = useAuth();
    return(
        <Page title="Trang chủ">
            {profile?.role === ROLE.ADMIN && (
                <DashboardAdmin/>
            )}
            {profile?.role === ROLE.MANAGER && (
                <DashboardManager/>
            )}
            {profile?.role === ROLE.APPLICATION_EMPLOYEE && (
                <DashboardApplicationEmployee/>
            )}
            {profile?.role === ROLE.PRODUCTION_EMPLOYEE && (
                <DashboardProductionEmployee/>
            )}
            {profile?.role === ROLE.EXCHANGE_EMPLOYEE && (
                <DashboardExchangeEmployee/>
            )}
        </Page>
    )
}

export default DashboardManagement;