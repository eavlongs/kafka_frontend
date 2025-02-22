import { getTopicPartitions } from "./actions";
import TopicClientPage from "./TopicClientPage";

export default async function Page({
    params,
}: {
    params: Promise<{ topic: string }>;
}) {
    const { topic } = await params;

    const partitions = await getTopicPartitions(topic);

    return <TopicClientPage topic={topic} partitions={partitions} />;
}

export const dynamic = "force-dynamic";
