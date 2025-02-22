"use server";

import { ActionResponse, ApiResponse, Message, Partition } from "@/app/types";
import { apiUrl } from "@/app/utils";
import { revalidatePath } from "next/cache";

export async function getTopicPartitions(topic: string) {
    const response = await fetch(`${apiUrl}/topics/${topic}/partitions`);
    const json: ApiResponse<{
        partitions: Partition[];
    }> = await response.json();

    if (!response.ok || !json.success || !json.data) {
        return [];
    }

    return json.data.partitions;
}

export async function getMessages(topic: string, offset: string) {
    console.log({ offset });
    console.log({ url: `${apiUrl}/topics/${topic}/messages?offset=${offset}` });
    const response = await fetch(
        `${apiUrl}/topics/${topic}/messages?offset=${offset}`,
        { cache: "no-store" }
    );
    const json: ApiResponse<{ messages: Message[] }> = await response.json();

    if (!response.ok || !json.success || !json.data) {
        return [];
    }
    console.log("fetched for offset " + offset);

    return json.data.messages;
}

export async function produceMessage(
    topic: string,
    key: string | null,
    message: string
) {
    const response = await fetch(`${apiUrl}/send`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, key, message }),
    });

    const json: ActionResponse = await response.json();

    if (!response.ok || !json.success) {
        return {
            success: false,
            message: json.message,
        };
    }

    return {
        success: true,
        message: json.message,
    };
}

export async function revalidatePathData(path: string) {
    revalidatePath(path);
}
