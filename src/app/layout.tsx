export const dynamic = "force-dynamic"; // This prevents static building
export const fetchCache = "force-no-store";

import { Sidebar } from "@/components/custom/sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react"; // Added import for React
import "./globals.css";
import PageWrapper from "@/components/custom/page-wrapper";
import { getBrokers } from "./actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Kafka Cluster Manager",
    description: "Manage your Kafka clusters with ease",
};

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const brokers = await getBrokers();

    if (!brokers) {
        return (
            <PageWrapper pageName='Kafka Cluster Overview'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-3xl font-bold'>
                        Kafka Cluster Overview
                    </h1>
                    <p className='text-lg'>
                        There are no Kafka servers running on this machine.
                    </p>
                    <p className='text-lg'>
                        Please make sure that Kafka is running on this machine.
                    </p>
                </div>
            </PageWrapper>
        );
    }

    return (
        <html lang='en'>
            <body className={inter.className}>
                <div className='flex h-screen'>
                    <Sidebar />
                    <main className='flex-1 overflow-y-auto p-6'>
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
