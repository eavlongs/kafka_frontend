"use client";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useRef, useState } from "react";
import { updateConfig } from "./actions";
import { Button } from "@/components/ui/button";

export default function BrokerConfigTable({
    config,
    id,
}: {
    config: Record<string, string>;
    id: string;
}) {
    const [editing, setEditing] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    async function saveConfig(id: string, key: string, value: string) {
        const response = await updateConfig(id, key, value);
        if (response.success) {
            setEditing("");
            return;
        }
        alert(response.message);
        return;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Key</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Object.keys(config).map((key) => (
                    <TableRow key={key}>
                        <TableCell>{key}</TableCell>

                        <TableCell>
                            {editing == key ? (
                                <Input
                                    ref={inputRef}
                                    defaultValue={config[key]}
                                    onKeyDown={async (e) => {
                                        if (e.key === "Enter") {
                                            await saveConfig(
                                                id,
                                                key,
                                                inputRef.current?.value || ""
                                            );
                                        }
                                    }}
                                />
                            ) : (
                                config[key]
                            )}
                        </TableCell>

                        <TableCell className='flex items-center gap-x-2'>
                            <Button
                                className='select-none'
                                onClick={() =>
                                    setEditing((prev) =>
                                        prev == key ? "" : key
                                    )
                                }
                            >
                                {editing == key ? "Cancel" : "Edit"}
                            </Button>
                            {editing == key && (
                                <Button
                                    onClick={async () => {
                                        await saveConfig(
                                            id,
                                            key,
                                            inputRef.current?.value || ""
                                        );
                                    }}
                                >
                                    Save
                                </Button>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
