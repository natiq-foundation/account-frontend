"use client"

import { useState, useRef, useEffect } from "react"
import {
    generateAuthenticatorSetup,
    verifyAuthenticatorCode,
    disableTwoStep,
    generateBackupCodes,
} from "../services/twoStep.services"

export type TwoStepMethod =
    | "email"
    | "sms"
    | "backupCodes"
    | "authenticator"

type MethodStatus = "idle" | "enabled" | "verified"

export function useTwoStep() {
    const mounted = useRef(true)

    const [isEnabled, setIsEnabled] = useState(false)
    const [methods, setMethods] = useState<Record<TwoStepMethod, MethodStatus>>({
        email: "idle",
        sms: "idle",
        backupCodes: "idle",
        authenticator: "idle",
    })

    const [secret, setSecret] = useState<string | null>(null)
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)
    const [backupCodes, setBackupCodes] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        mounted.current = true
        return () => { mounted.current = false }
    }, [])

    const startAuthenticatorSetup = async (email: string) => {
        if (!mounted.current) return
        setIsLoading(true)
        setError(null)

        try {
            const res = await generateAuthenticatorSetup(email)
            if (!mounted.current) return

            setSecret(res.secret)
            setQrCodeUrl(res.qrCodeUrl)
            setMethods((prev) => ({ ...prev, authenticator: "enabled" }))
        } catch (err: unknown) {
            if (!mounted.current) return
            if (err instanceof Error) setError(err.message)
            else setError("Unknown error")
        } finally {
            if (!mounted.current) return
            setIsLoading(false)
        }
    }

    const verifyMethod = async (method: TwoStepMethod, code?: string) => {
        if (!mounted.current) return
        setIsLoading(true)
        setError(null)

        try {
            if (method === "authenticator") {
                if (!secret) throw new Error("Missing secret")
                await verifyAuthenticatorCode(code!, secret)
            }

            if (method === "backupCodes") {
                const res = await generateBackupCodes()
                if (mounted.current) setBackupCodes(res.codes)
            }

            if (mounted.current) {
                setMethods((prev) => ({
                    ...prev,
                    [method]: "verified",
                }))
            }
        } catch (err: unknown) {
            if (!mounted.current) return
            if (err instanceof Error) setError(err.message)
            else setError("Unknown error")
        } finally {
            if (!mounted.current) return
            setIsLoading(false)
        }
    }

    const activate = () => {
        const verifiedCount = Object.values(methods).filter((v) => v === "verified").length
        if (verifiedCount < 3) return
        setIsEnabled(true)
    }

    const turnOff = async () => {
        await disableTwoStep()
        if (mounted.current) setIsEnabled(false)
    }

    return {
        isEnabled,
        methods,
        qrCodeUrl,
        secret,
        backupCodes,
        error,
        isLoading,
        startAuthenticatorSetup,
        verifyMethod,
        activate,
        turnOff,
    }
}