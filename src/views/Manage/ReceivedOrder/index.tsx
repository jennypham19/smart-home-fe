import Page from "@/components/Page"
import { ROLE } from "@/constants/roles";
import useAuth from "@/hooks/useAuth"
import ReceivedProductionOrders from "../ProductionEmployee/ReceivedProductionOrders";
import ReceivedExchangeOrders from "../ExchangeEmployee/ReceivedExchangeOrders";

const ReceivedOrder = () => {
    const { profile} = useAuth();
    return(
        <Page title="Đơn tiếp nhận">
            {profile?.role === ROLE.PRODUCTION_EMPLOYEE && (
                <ReceivedProductionOrders/>
            )}
            {profile?.role === ROLE.EXCHANGE_EMPLOYEE && (
                <ReceivedExchangeOrders/>
            )}
        </Page>
    )
}

export default ReceivedOrder