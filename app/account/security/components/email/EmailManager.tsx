"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddEmailDialog } from "./AddEmailDialog";
import { EmailListItem } from "./EmailListItem";

export function EmailManager() {
    const [emails, setEmails] = useState([
        { email: "user@example.com", primary: true, verified: true },
    ]);

    const [openAdd, setOpenAdd] = useState(false);

    return (
        <div className="space-y-4">

            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Email Addresses</h2>
                <Button
                    onClick={() => setOpenAdd(true)}
                    disabled={emails.length >= 5}
                >
                    Add Email
                </Button>
            </div>

            <div className="space-y-2">
                {emails.map((e, i) => (
                    <EmailListItem
                        key={e.email}
                        data={e}
                        onDelete={() => {
                            setEmails(prev => prev.filter(x => x.email !== e.email));
                        }}
                        onMakePrimary={() => {
                            setEmails(prev =>
                                prev.map(x => ({
                                    ...x,
                                    primary: x.email === e.email,
                                }))
                            );
                        }}
                    />
                ))}
            </div>

            <AddEmailDialog
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                onSuccess={(newEmail) => {
                    setEmails(prev => [...prev, newEmail]);
                }}
            />

        </div>
    );
}
