"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { BrokerWithStatus } from "../types";

export default function BrokerTable({
    brokers,
}: {
    brokers: BrokerWithStatus[];
}) {
    const router = useRouter();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Host</TableHead>
                    <TableHead>Port</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {brokers.map((broker) => (
                    <TableRow
                        key={broker.id}
                        className='hover:cursor-pointer'
                        onClick={() => router.push(`/brokers/${broker.id}`)}
                    >
                        <TableCell>{broker.id}</TableCell>
                        <TableCell>{broker.ip}</TableCell>
                        <TableCell>{broker.port}</TableCell>
                        <TableCell className='capitalize'>
                            {broker.status}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
