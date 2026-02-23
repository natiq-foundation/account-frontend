import { Phone } from "../models/phone.model";
import { phonesMock } from "../mocks/phone.mock";

// fetch
export const fetchPhones = async (): Promise<Phone[]> =>
    new Promise((res) => setTimeout(() => res([...phonesMock]), 300));

// fake send sms
export const sendVerificationCode = async (number: string): Promise<string> => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("Fake SMS Code:", code); // فقط برای تست

    return new Promise((res) => setTimeout(() => res(code), 500));
};

// add verified phone
export const addPhone = async (phone: Phone): Promise<Phone> => {
    phonesMock.push(phone);
    return new Promise((res) => setTimeout(() => res(phone), 300));
};

export const deletePhone = async (id: string): Promise<void> => {
    const index = phonesMock.findIndex((p) => p.id === id);
    if (index !== -1) phonesMock.splice(index, 1);
    return new Promise((res) => setTimeout(() => res(), 300));
};

export const makePrimaryPhone = async (id: string): Promise<void> => {
    phonesMock.forEach((p) => (p.primary = p.id === id));
    return new Promise((res) => setTimeout(() => res(), 300));
};