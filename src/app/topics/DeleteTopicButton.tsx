"use client";

import { Button } from "@/components/ui/button";
import { deleteTopic } from "./actions";

export default function DeleteTopicButton({ topic }: { topic: string }) {
    async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        const response = await deleteTopic(topic);

        if (!response.success) {
            alert(response.message);
            return;
        }
    }
    return (
        <Button variant='destructive' onClick={handleDelete}>
            Delete
        </Button>
    );
}
