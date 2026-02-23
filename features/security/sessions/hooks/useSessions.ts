import { useEffect, useState, useRef } from "react";
import {
    fetchSessions,
    terminateSession as terminateSessionService,
    terminateAllOtherSessions,
} from "../services/session.service";
import { Session } from "../models/session.model";

export const useSessions = () => {
    const mounted = useRef(true);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);

    const loadSessions = async () => {
        if (!mounted.current) return;
        setLoading(true);
        try {
            const data = await fetchSessions();
            if (mounted.current) setSessions(data);
        } finally {
            if (mounted.current) setLoading(false);
        }
    };

    const terminate = async (id: string) => {
        await terminateSessionService(id);
        await loadSessions();
    };

    const terminateAll = async () => {
        await terminateAllOtherSessions();
        await loadSessions();
    };

    useEffect(() => {
        mounted.current = true;
        loadSessions();
        return () => { mounted.current = false; }
    }, []);

    return { sessions, loading, terminate, terminateAll };
};