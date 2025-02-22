import PageWrapper from "@/components/custom/page-wrapper";
import { getBrokerConfig } from "./actions";
import BrokerConfigTable from "./BrokerConfigTable";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const config = await getBrokerConfig(id);

    if (!config) {
        return <div>Broker not found</div>;
    }

    return (
        <PageWrapper pageName={`Broker ${id} Configurations`}>
            {/* <div className='flex justify-end mb-4'>
                <ResetConfigButton id={id} />
            </div> */}
            <BrokerConfigTable config={config} id={id} />
        </PageWrapper>
    );
}

export const dynamic = "force-dynamic";
