"use client";

import { Message, Partition } from "@/app/types";
import { ConfigurationsList } from "@/components/custom/configuration-list";
import { MessagesList } from "@/components/custom/message-list";
import { PartitionsList } from "@/components/custom/partition-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TopicClientPage({
    topic,
    partitions,
}: {
    topic: string;
    partitions: Partition[];
}) {
    const [activeTab, setActiveTab] = useState("partitions");

    return (
        <div className='space-y-4'>
            <h1 className='text-2xl font-bold'>Topic: {topic}</h1>
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className='w-full'
            >
                <TabsList>
                    <TabsTrigger value='partitions'>Partitions</TabsTrigger>
                    <TabsTrigger value='messages'>Messages</TabsTrigger>
                    <TabsTrigger value='configurations'>
                        Configurations
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='partitions'>
                    <PartitionsList partitions={partitions} />
                </TabsContent>
                <TabsContent value='messages'>
                    <MessagesList topic={topic} />
                </TabsContent>
                <TabsContent value='configurations'>
                    <ConfigurationsList />
                </TabsContent>
            </Tabs>
        </div>
    );
}
