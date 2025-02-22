import PageWrapper from "@/components/custom/page-wrapper";
import { getBrokers } from "../actions";
import BrokerTable from "./BrokerTable";

export default async function Home() {
    const brokers = await getBrokers();
    return (
        <PageWrapper pageName='Brokers'>
            <BrokerTable brokers={brokers} />
        </PageWrapper>
    );
}

export const dynamic = "force-dynamic";
