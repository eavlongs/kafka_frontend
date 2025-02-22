"use server";

import { revalidatePath } from "next/cache";
import { ActionResponse, ApiResponse, TopicDetail } from "../types";
import { apiUrl } from "../utils";

export async function getTopics() {
    const response = await fetch(`${apiUrl}/topics`, {
        method: "GET",
        cache: "no-store",
    });
    const json: ApiResponse<{ topics: TopicDetail[] }> = await response.json();

    if (!response.ok || !json.success || !json.data?.topics) {
        return [];
    }

    return json.data.topics;
}

export async function createTopic(
    topic: string,
    partitions: number,
    replicationFactor: number,
    pathname: string
): Promise<ActionResponse> {
    const response = await fetch(`${apiUrl}/topics`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            topic,
            partitions,
            replication_factor: replicationFactor,
        }),
    });

    const json: ApiResponse = await response.json();

    if (!response.ok || !json.success) {
        return {
            success: false,
            message: json.message || "Something went wrong",
        };
    }

    revalidatePath(pathname);

    return {
        success: true,
        message: json.message,
    };
}

export async function deleteTopic(topic: string): Promise<ActionResponse> {
    const response = await fetch(`${apiUrl}/topics/${topic}`, {
        method: "DELETE",
    });

    const json: ApiResponse = await response.json();

    if (!response.ok || !json.success) {
        return {
            success: false,
            message: json.message,
        };
    }

    revalidatePath("/topics");

    return {
        success: true,
        message: json.message,
    };
}
