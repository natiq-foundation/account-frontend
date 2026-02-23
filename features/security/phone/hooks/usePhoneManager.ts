import { useState, useEffect, useRef } from "react";
import { Phone } from "../models/phone.model";
import {
    fetchPhones,
    addPhone,
    deletePhone,
    makePrimaryPhone,
    sendVerificationCode,
} from "../services/phone.services";

export const usePhoneManager = () => {
    const mounted = useRef(true);
    const [phones, setPhones] = useState<Phone[]>([]);
    const [loading, setLoading] = useState(false);
    const [pendingNumber, setPendingNumber] = useState<string | null>(null);
    const [verificationCode, setVerificationCode] = useState<string | null>(null);

    useEffect(() => {
        mounted.current = true;
        const load = async () => {
            if (!mounted.current) return;
            setLoading(true);
            try {
                const data = await fetchPhones();
                if (mounted.current) setPhones(data);
            } finally {
                if (mounted.current) setLoading(false);
            }
        };
        load();
        return () => { mounted.current = false; };
    }, []);

    const startPhoneVerification = async (number: string) => {
        setLoading(true);
        try {
            const code = await sendVerificationCode(number);
            if (!mounted.current) return;
            setPendingNumber(number);
            setVerificationCode(code);
        } finally {
            if (mounted.current) setLoading(false);
        }
    };

    const confirmPhone = async (code: string) => {
        if (!pendingNumber || !verificationCode) return false;
        if (code !== verificationCode) return false;

        const newPhone: Phone = {
            id: Date.now().toString(),
            number: pendingNumber,
            primary: false,
            verified: true,
        };

        const saved = await addPhone(newPhone);
        if (mounted.current) setPhones((prev) => [...prev, saved]);
        if (mounted.current) {
            setPendingNumber(null);
            setVerificationCode(null);
        }

        return true;
    };

    const removePhone = async (id: string) => {
        setLoading(true);
        try {
            await deletePhone(id);
            if (mounted.current) setPhones((prev) => prev.filter((p) => p.id !== id));
        } finally {
            if (mounted.current) setLoading(false);
        }
    };

    const setPrimary = async (id: string) => {
        setLoading(true);
        try {
            await makePrimaryPhone(id);
            if (mounted.current)
                setPhones((prev) =>
                    prev.map((p) => ({ ...p, primary: p.id === id }))
                );
        } finally {
            if (mounted.current) setLoading(false);
        }
    };

    return {
        phones,
        loading,
        removePhone,
        setPrimary,
        startPhoneVerification,
        confirmPhone,
        pendingNumber,
    };
};