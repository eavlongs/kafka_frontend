import { notFound } from "next/navigation";
import { getTopics } from "./actions";
import { CreateTopicDialog } from "./CreateTopicDialog";
import TopicTable from "./TopicTable";

export default async function Page() {
    const topics = await getTopics();

    return (
        <div>
            <h1 className='text-2xl font-bold mb-4'>Topics</h1>
            <div className='flex justify-end my-2'>
                <CreateTopicDialog />
            </div>
            <TopicTable topics={topics} />
        </div>
    );
}
