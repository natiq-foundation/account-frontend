import { ChangePasswordPayload } from "../models/password.model";

let MOCK_PASSWORD = "12345678";

export const verifyCurrentPassword = async (
    currentPassword: string
): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(currentPassword === MOCK_PASSWORD);
        }, 500);
    });
};

export const changePassword = async (
    payload: ChangePasswordPayload
): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            MOCK_PASSWORD = payload.newPassword;
            resolve(true);
        }, 500);
    });
};