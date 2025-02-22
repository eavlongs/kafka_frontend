import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Configuration {
    key: string;
    value: string;
}

export function ConfigurationsList() {
    // This would typically be fetched from an API
    const configurations: Configuration[] = [
        { key: "cleanup.policy", value: "delete" },
        { key: "compression.type", value: "producer" },
        { key: "delete.retention.ms", value: "86400000" },
        { key: "file.delete.delay.ms", value: "60000" },
        { key: "flush.messages", value: "9223372036854775807" },
        { key: "flush.ms", value: "9223372036854775807" },
        { key: "follower.replication.throttled.replicas", value: "" },
        { key: "index.interval.bytes", value: "4096" },
        { key: "leader.replication.throttled.replicas", value: "" },
        { key: "max.compaction.lag.ms", value: "9223372036854775807" },
    ];

    return (
        <div>
            <h2 className='text-xl font-semibold mb-4'>Configurations</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Key</TableHead>
                        <TableHead>Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {configurations.map((config) => (
                        <TableRow key={config.key}>
                            <TableCell>{config.key}</TableCell>
                            <TableCell>{config.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
