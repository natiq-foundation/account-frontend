export type Session = {
    id: string;
    device: string;
    location: string;
    ip: string;
    lastActive: number;
    isCurrent: boolean;
};