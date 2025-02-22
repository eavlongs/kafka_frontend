"use client";

import { Button } from "@/components/ui/button";
import { resetConfigAction } from "./actions";

export default function ResetConfigButton({ id }: { id: string }) {
    async function resetConfig() {
        if (await resetConfigAction(id)) {
            alert("Config reset successfully");
            return;
        }
        alert("Failed to reset config");
    }
    return (
        <Button variant='destructive' onClick={resetConfig}>
            Reset Config
        </Button>
    );
}
