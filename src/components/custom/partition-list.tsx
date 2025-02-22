import { Partition } from "@/app/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function PartitionsList({ partitions }: { partitions: Partition[] }) {
    return (
        <div>
            <h2 className='text-xl font-semibold mb-4'>Partitions</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Partition ID</TableHead>
                        <TableHead>Replicas</TableHead>
                        <TableHead>Leader</TableHead>
                        <TableHead>In-Sync Replicas</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {partitions.map((partition) => (
                        <TableRow key={partition.partition}>
                            <TableCell>{partition.partition}</TableCell>
                            <TableCell>
                                {partition.replicas.join(", ")}
                            </TableCell>
                            <TableCell>{partition.leader}</TableCell>
                            <TableCell>{partition.isr.join(", ")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
