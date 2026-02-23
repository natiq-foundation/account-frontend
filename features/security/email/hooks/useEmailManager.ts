import { useState, useEffect, useRef } from "react";
import { Email } from "../models/email.model";
import { fetchEmails, addEmail, deleteEmail, makePrimaryEmail } from "../services/email.service";

export const useEmailManager = () => {
    const mounted = useRef(true);
    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        mounted.current = true;
        const load = async () => {
            if (!mounted.current) return;
            setLoading(true);
            try {
                const data = await fetchEmails();
                if (mounted.current) setEmails(data);
            } finally {
                if (mounted.current) setLoading(false);
            }
        };
        load();
        return () => { mounted.current = false; };
    }, []);

    const addNewEmail = async (email: Email) => {
        setLoading(true);
        try {
            const newEmail = await addEmail(email);
            if (mounted.current) setEmails((prev) => [...prev, newEmail]);
        } finally {
            if (mounted.current) setLoading(false);
        }
    };

    const removeEmail = async (id: string) => {
        setLoading(true);
        try {
            await deleteEmail(id);
            if (mounted.current) setEmails((prev) => prev.filter((e) => e.id !== id));
        } finally {
            if (mounted.current) setLoading(false);
        }
    };

    const setPrimary = async (id: string) => {
        setLoading(true);
        try {
            await makePrimaryEmail(id);
            if (mounted.current)
                setEmails((prev) => prev.map((e) => ({ ...e, primary: e.id === id })));
        } finally {
            if (mounted.current) setLoading(false);
        }
    };

    return { emails, loading, addNewEmail, removeEmail, setPrimary };
};