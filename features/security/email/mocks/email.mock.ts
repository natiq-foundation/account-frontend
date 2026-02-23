import { Email } from "../models/email.model";

export const emailsMock: Email[] = [
    { id: "1", email: "user@example.com", primary: true, verified: true },
    { id: "2", email: "test@example.com", primary: false, verified: true },
];
