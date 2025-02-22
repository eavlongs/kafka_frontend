"use client";

import { getMessages, produceMessage } from "@/app/topics/[topic]/actions";
import { Message } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ArrowRight, ChevronFirst, ChevronLast, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function MessagesList({ topic }: { topic: string }) {
    // const [searchTerm, setSearchTerm] = useState("");
    const keyRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLInputElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [messagesToShow, setMessagesToShow] = useState<Message[]>([]);
    const [offset, setOffset] = useState("earliest");
    const [openWs, setOpenWs] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const messages = await getMessages(topic, offset);
            setMessagesToShow(messages);
        }

        fetchData();
    }, [offset]);

    // create web socket connection
    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        if (!openWs && socket) {
            socket.close();
            return;
        }

        if (openWs && socket) {
            socket.close();
        }

        const ws = new WebSocket(
            "ws://localhost:8080/ws/kafka/topics/" + topic
        );
        ws.onmessage = (event) => {
            const message: Message & {
                success: boolean;
                topic: string;
            } = JSON.parse(event.data);

            if (message.success) {
                setMessagesToShow((prevMessages) => [...prevMessages, message]);

                return;
            }
        };
        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };
        setSocket(ws);
        return () => {
            ws.close(); // Cleanup on unmount
        };
    }, [openWs]);

    async function handleProduceMessage() {
        const key = keyRef.current?.value;
        const message = messageRef.current?.value;
        if (!message) {
            alert("Message is required");
            return;
        }

        if (key === undefined) {
            alert("Key is undefined");
            return;
        }

        setOpenWs(false);

        const response = await produceMessage(topic, key, message);

        setOpenWs(true);

        if (!response.success) {
            alert(response.message);
            return;
        }

        setIsDialogOpen(false);
    }

    return (
        <div className='space-y-4'>
            <div className='flex items-center  space-x-2'>
                <h2 className='text-xl font-semibold mb-4 flex-1'>Messages</h2>
                <Button onClick={() => setOffset("earliest")} variant='outline'>
                    <ChevronFirst className='mr-2 h-4 w-4' /> First
                </Button>
                <Button onClick={() => setOffset("latest")} variant='outline'>
                    <ChevronLast className='mr-2 h-4 w-4' /> Last
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className='mr-2 h-4 w-4' /> Produce Message
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Produce New Message</DialogTitle>
                        </DialogHeader>
                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <Label htmlFor='messageKey'>Key</Label>
                                <Input
                                    id='messageKey'
                                    ref={keyRef}
                                    placeholder='Enter message key'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='messageValue'>Value</Label>
                                <Input
                                    id='messageValue'
                                    ref={messageRef}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleProduceMessage();
                                        }
                                    }}
                                    placeholder='Enter message value'
                                />
                            </div>
                            <Button
                                type='button'
                                onClick={handleProduceMessage}
                                className='w-full'
                            >
                                Produce Message
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Offset</TableHead>
                        <TableHead>Key</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {messagesToShow.map((message) => (
                        <TableRow key={message.offset}>
                            <TableCell>{message.offset}</TableCell>
                            <TableCell>
                                {message.key == null ? "(null)" : message.key}
                            </TableCell>
                            <TableCell>{message.value}</TableCell>
                            <TableCell>
                                {new Date(message.timestamp).toLocaleString()}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    onClick={() =>
                                        setOffset(message.offset.toString())
                                    }
                                >
                                    <ArrowRight className='mr-2 h-4 w-4' /> Set
                                    Offset
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
