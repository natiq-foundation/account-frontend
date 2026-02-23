import { Session } from "../models/session.model";

let MOCK_SESSIONS: Session[] = [
    {
        id: "1",
        device: "Chrome on Windows",
        location: "Tehran, Iran",
        ip: "185.12.34.56",
        lastActive: Date.now(),
        isCurrent: true,
    },
    {
        id: "2",
        device: "Mobile App - iPhone 15",
        location: "Tabriz, Iran",
        ip: "5.160.88.21",
        lastActive: Date.now() - 1000 * 60 * 60 * 2,
        isCurrent: false,
    },
];

export const fetchSessions = async (): Promise<Session[]> => {
    return new Promise((resolve) =>
        setTimeout(() => resolve([...MOCK_SESSIONS]), 500)
    );
};

export const terminateSession = async (id: string) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            MOCK_SESSIONS = MOCK_SESSIONS.filter((s) => s.id !== id);
            resolve();
        }, 400);
    });
};

export const terminateAllOtherSessions = async () => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            MOCK_SESSIONS = MOCK_SESSIONS.filter((s) => s.isCurrent);
            resolve();
        }, 400);
    });
};