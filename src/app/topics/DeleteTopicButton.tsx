"use client";

import { Button } from "@/components/ui/button";
import { deleteTopic } from "./actions";
import { useRouter } from "next/navigation";

export default function DeleteTopicButton({ topic }: { topic: string }) {
    const router = useRouter();
    async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        const response = await deleteTopic(topic);

        if (!response.success) {
            alert(response.message);
            return;
        }

        router.refresh();
    }
    return (
        <Button variant='destructive' onClick={handleDelete}>
            Delete
        </Button>
    );
}
