"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TopicDetail } from "../types";
import DeleteTopicButton from "./DeleteTopicButton";
import { useRouter } from "next/navigation";

export default function TopicTable({ topics }: { topics: TopicDetail[] }) {
    const router = useRouter();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Partitions</TableHead>
                    <TableHead>Replication Factor</TableHead>
                    <TableHead>Message Count</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {topics.map((topic) => (
                    <TableRow
                        key={topic.name}
                        className='hover:cursor-pointer'
                        onClick={() => router.push(`/topics/${topic.name}`)}
                    >
                        <TableCell>{topic.name}</TableCell>
                        <TableCell>{topic.partitions}</TableCell>
                        <TableCell>{topic.replicationFactor}</TableCell>
                        <TableCell>{topic.messageCount}</TableCell>
                        <TableCell>
                            <DeleteTopicButton topic={topic.name} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
