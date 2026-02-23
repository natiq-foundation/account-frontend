"use client";

import { Button } from "@/components/ui/button";
import { EmailItem } from "./type";

interface EmailListItemProps {
    data: EmailItem;
    onDelete: () => void;
    onMakePrimary: () => void;
}

export function EmailListItem({ data, onDelete, onMakePrimary }: EmailListItemProps) {
    return (
        <div className="border rounded-lg p-3 flex justify-between items-center">
            <div>
                <p className="font-medium">{data.email}</p>
                <div className="text-sm text-gray-500">
                    {data.primary ? "Primary" : data.verified ? "Verified" : "Pending verification"}
                </div>
            </div>

            <div className="flex gap-2">
                {!data.primary && (
                    <Button size="sm" variant="outline" onClick={onMakePrimary}>
                        Make Primary
                    </Button>
                )}
                {!data.primary && (
                    <Button size="sm" variant="destructive" onClick={onDelete}>
                        Remove
                    </Button>
                )}
            </div>
        </div>
    );
}
