"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteTopic } from "./actions";

export default function DeleteTopicButton({ topic }: { topic: string }) {
    const router = useRouter();
    async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        const response = await deleteTopic(topic);

        if (!response.success) {
            alert(response.message);
            return;
        }

        window.location.href = "/topics";
    }
    return (
        <Button variant='destructive' onClick={handleDelete}>
            Delete
        </Button>
    );
}
