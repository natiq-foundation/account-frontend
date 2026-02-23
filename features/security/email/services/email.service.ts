import { Email } from "../models/email.model";
import { emailsMock } from "../mocks/email.mock";

export const fetchEmails = async (): Promise<Email[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...emailsMock]), 300));
};

export const addEmail = async (newEmail: Email): Promise<Email> => {
    emailsMock.push(newEmail);
    return new Promise((resolve) => setTimeout(() => resolve(newEmail), 300));
};

export const deleteEmail = async (id: string): Promise<void> => {
    const index = emailsMock.findIndex((e) => e.id === id);
    if (index !== -1) emailsMock.splice(index, 1);
    return new Promise((resolve) => setTimeout(() => resolve(), 300));
};

export const makePrimaryEmail = async (id: string): Promise<void> => {
    emailsMock.forEach((e) => (e.primary = e.id === id));
    return new Promise((resolve) => setTimeout(() => resolve(), 300));
};
