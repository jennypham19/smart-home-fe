import { ROLE } from "@/constants/roles";
import useAuth from "@/hooks/useAuth";
import { Box } from "@mui/material"
import DashboardAdmin from "../Admin/Dashboard";
import DashboardManager from "../Manager/Dashboard";
import DashboardApplicationEmployee from "../ExchangeEmployee/Dashboard";
import DashboardProductionEmployee from "../ProductionEmployee/Dashboard";
import DashboardExchangeEmployee from "../ApplicationEmployee/Dashboard";
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