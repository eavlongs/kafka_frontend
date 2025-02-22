import Link from "next/link";
import { Server, MessageSquare, Users } from "lucide-react";

export function Sidebar() {
    return (
        <div className='w-64 bg-gray-800 text-white p-4'>
            <h1 className='text-2xl font-bold mb-6'>Kafka Manager</h1>
            <nav>
                <ul className='space-y-2'>
                    <li>
                        <Link
                            href='/brokers'
                            className='flex items-center space-x-2 p-2 rounded hover:bg-gray-700'
                        >
                            <Server size={20} />
                            <span>Brokers</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/topics'
                            className='flex items-center space-x-2 p-2 rounded hover:bg-gray-700'
                        >
                            <MessageSquare size={20} />
                            <span>Topics</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='/consumers'
                            className='flex items-center space-x-2 p-2 rounded hover:bg-gray-700'
                        >
                            <Users size={20} />
                            <span>Consumers</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
