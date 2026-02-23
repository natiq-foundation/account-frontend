"use server"

import { authenticator } from "otplib"
import QRCode from "qrcode"

export async function generateAuthenticatorSetup(email: string) {
    const secret = authenticator.generateSecret()

    const otpauth = authenticator.keyuri(
        email,
        "MyApp",
        secret
    )

    const qrCodeUrl = await QRCode.toDataURL(otpauth)

    return { qrCodeUrl, secret }
}

export async function verifyAuthenticatorCode(
    code: string,
    secret: string
) {
    const isValid = authenticator.check(code, secret)
    if (!isValid) throw new Error("Invalid verification code")
    return true
}

export async function disableTwoStep() {
    await new Promise((r) => setTimeout(r, 500))
}

export async function generateBackupCodes() {
    const codes = [
        "A1B2-C3D4",
        "E5F6-G7H8",
        "I9J0-K1L2",
        "M3N4-O5P6",
        "Q7R8-S9T0",
        "U1V2-W3X4",
        "Y5Z6-A7B8",
        "C9D0-E1F2",
        "G3H4-I5J6",
        "K7L8-M9N0",
    ]
    return { codes }
}