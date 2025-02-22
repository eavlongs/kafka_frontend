"use server";

import { ActionResponse, ApiResponse } from "@/app/types";
import { apiUrl } from "@/app/utils";
import { revalidatePath } from "next/cache";

export async function getBrokerConfig(id: string) {
    const response = await fetch(`${apiUrl}/brokers/${id}/config`);
    const json: ApiResponse<{
        config: Record<string, string>;
    }> = await response.json();

    if (!response.ok || !json.success || !json.data) {
        return null;
    }

    return json.data.config;
}

export async function updateConfig(
    id: string,
    key: string,
    value: string
): Promise<ActionResponse> {
    const response = await fetch(`${apiUrl}/brokers/${id}/config`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            [key]: value,
        }),
    });

    const json: ApiResponse = await response.json();
    if (!response.ok || !json.success) {
        return {
            success: false,
            message: json.message,
        };
    }

    revalidatePath("/brokers/" + id);
    return {
        success: true,
        message: json.message,
    };
}

export async function resetConfigAction(id: string) {
    const response = await fetch(`${apiUrl}/brokers/${id}/config/reset`, {
        method: "POST",
    });
    const json: ApiResponse = await response.json();
    console.log(json);
    if (!response.ok || !json.success) {
        return false;
    }

    revalidatePath("/brokers/" + id);
    return true;
}

export const dynamic = "force-dynamic";
