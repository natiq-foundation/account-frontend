"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddEmailDialog } from "./AddEmailDialog";
import { EmailListItem } from "./EmailListItem";
import { useEmailManager } from "@/features/security/email/hooks/useEmailManager";

export function EmailManager() {
    const { emails, loading, addNewEmail, removeEmail, setPrimary } = useEmailManager();
    const [openAdd, setOpenAdd] = useState(false);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Email Addresses</h2>
                <Button
                    onClick={() => setOpenAdd(true)}
                    disabled={emails.length >= 5 || loading}
                >
                    Add Email
                </Button>
            </div>

            <div className="space-y-2">
                {emails.map((e) => (
                    <EmailListItem
                        key={e.id}
                        data={e}
                        onDelete={() => removeEmail(e.id)}
                        onMakePrimary={() => setPrimary(e.id)}
                    />
                ))}
            </div>

            <AddEmailDialog
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                onSuccess={(newEmail) => addNewEmail(newEmail)}
            />
        </div>
    );
}
