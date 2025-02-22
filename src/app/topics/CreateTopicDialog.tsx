"use client";

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
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { createTopic } from "./actions";

export function CreateTopicDialog() {
    const [open, setOpen] = useState(false);
    const topicRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname();
    const router = useRouter();
    // const partitionsRef = useRef<HTMLInputElement>(null);
    // const replicationFactorRef = useRef<HTMLInputElement>(null);

    async function handleSubmit() {
        if (!topicRef.current) {
            alert("Please fill in all fields");
            return;
        }

        const topic = topicRef.current.value;
        const partitions = 6;
        const replicationFactor = 3;

        const resposne = await createTopic(
            topic,
            partitions,
            replicationFactor,
            pathname
        );

        if (!resposne.success) {
            alert(resposne.message);
            return;
        }

        window.location.href = "/topics";
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className='mr-2 h-4 w-4' /> Create Topic
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Create New Topic</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='topicName'>Topic Name</Label>
                        <Input
                            id='topicName'
                            ref={topicRef}
                            placeholder='Enter topic name'
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit();
                                }
                            }}
                            required
                        />
                    </div>
                    {/* <div className='space-y-2'>
                        <Label htmlFor='partitions'>Partitions</Label>
                        <Input
                            id='partitions'
                            type='number'
                            ref={partitionsRef}
                            defaultValue={6}
                            min='1'
                            required
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit();
                                }
                            }}
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='replicationFactor'>
                            Replication Factor
                        </Label>
                        <Input
                            id='replicationFactor'
                            type='number'
                            ref={replicationFactorRef}
                            defaultValue={3}
                            min='1'
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit();
                                }
                            }}
                            required
                        />
                    </div> */}
                    <Button
                        type='button'
                        className='w-full'
                        onClick={handleSubmit}
                    >
                        Create Topic
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
