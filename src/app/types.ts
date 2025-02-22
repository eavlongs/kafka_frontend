export type ApiResponse<T = any> = {
    success: boolean;
    message: string;
    error?: any;
    data?: T;
};

export type ActionResponse = {
    success: boolean;
    message: string;
};

export type Prettify<T> = {
    [K in keyof T]: T[K];
};

export type Broker = {
    id: number;
    ip: string;
    port: number;
    rack: string | null;
};

export type BrokerWithStatus = Prettify<
    Broker & { status: "online" | "offline" }
>;

export type TopicDetail = {
    name: string;
    partitions: number;
    replicationFactor: number;
    messageCount: number;
};

export type Partition = {
    partition: number;
    leader: number;
    replicas: number[];
    isr: number[];
};

export type Message = {
    offset: number;
    partition: number;
    timestamp: string;
    key: string | null;
    value: string;
};
