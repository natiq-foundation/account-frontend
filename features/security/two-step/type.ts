export interface TwoStepSetupResponse {
    qrCodeUrl: string
    manualKey: string
}

export interface BackupCodesResponse {
    codes: string[]
}
