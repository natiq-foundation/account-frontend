import { Phone } from "../models/phone.model";

export const phonesMock: Phone[] = [
    { id: "1", number: "+123456789", primary: true, verified: true },
    { id: "2", number: "+987654321", primary: false, verified: false },
];
