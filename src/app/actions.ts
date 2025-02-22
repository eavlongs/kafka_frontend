"use server";

import { ApiResponse, BrokerWithStatus } from "./types";
import { apiUrl } from "./utils";

export async function getBrokers() {
    const response = await fetch(`${apiUrl}/brokers`);
    const json: ApiResponse<{
        nodes: BrokerWithStatus[];
    }> = await response.json();

    if (!response.ok || !json.success || !json.data) {
        return [];
    }

    return json.data.nodes;
}

export const dynamic = "force-dynamic";
