import { useState } from "react";

import { LastActivityList } from "@/components/modules/security/LastActivityList";
import { SecurityRow } from "@/components/modules/security/SecurityRow";
import { SecuritySection } from "@/components/modules/security/SecuritySection";
import { EmailManagementDialog } from "@/components/features/security/emailManagementDialog";
import type { EmailItem } from "@/components/features/security/emailManagementDialog";
import { PhoneManagementDialog } from "@/components/features/security/PhoneManagementDialog";
import type { PhoneItem } from "@/components/features/security/PhoneManagementDialog";

const initialEmails: EmailItem[] = [
  {
    id: "email-1",
    address: "amir@example.com",
    isPrimary: true,
    isVerified: true,
    notificationsEnabled: true,
  },
  {
    id: "email-2",
    address: "amir.work@company.com",
    isPrimary: false,
    isVerified: false,
    notificationsEnabled: false,
  },
];

const initialPhones: PhoneItem[] = [];

const initialActivities = [
  {
    id: "activity-1",
    title: "Security settings viewed",
    description: "You opened your account security settings.",
    date: "Just now",
  },
  {
    id: "activity-2",
    title: "Signed in to your account",
    description: "A successful sign-in was detected from your current device.",
    date: "Today",
  },
  {
    id: "activity-3",
    title: "Password changed",
    description: "Your account password was changed successfully.",
    date: "Aug 24, 2026",
  },
];

const SecurityPage = () => {
  const [emails, setEmails] = useState<EmailItem[]>(initialEmails);
  const [phones, setPhones] = useState<PhoneItem[]>(initialPhones);
  const [activities, setActivities] = useState(initialActivities);

  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);

  // وضعیت ایمیل اصلی
  const primaryEmail =
    emails.find((e) => e.isPrimary)?.address || "No primary email";

  // وضعیت شماره اصلی
  const primaryPhone = phones.find((p) => p.isPrimary);

  // --- Handlers: Email ---
  const handleAddEmail = (newAddress: string) => {
    const newEntry: EmailItem = {
      id: `email-${Date.now()}`,
      address: newAddress,
      isPrimary: emails.length === 0,
      isVerified: false,
      notificationsEnabled: false,
    };
    setEmails((prev) => [...prev, newEntry]);
    setActivities((prev) => [
      {
        id: `activity-${Date.now()}`,
        title: "New email added",
        description: `Added ${newAddress} as a secondary email address.`,
        date: "Just now",
      },
      ...prev,
    ]);
  };

  const handleRemoveEmail = (id: string) => {
    const emailToRemove = emails.find((e) => e.id === id);
    setEmails((prev) => prev.filter((e) => e.id !== id));
    if (emailToRemove) {
      setActivities((prev) => [
        {
          id: `activity-${Date.now()}`,
          title: "Email removed",
          description: `Removed ${emailToRemove.address} from your account.`,
          date: "Just now",
        },
        ...prev,
      ]);
    }
  };

  const handleSetPrimaryEmail = (id: string) => {
    setEmails((prev) =>
      prev.map((e) => ({
        ...e,
        isPrimary: e.id === id,
      }))
    );
  };

  const handleToggleNotifications = (id: string) => {
    setEmails((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, notificationsEnabled: !e.notificationsEnabled } : e
      )
    );
  };

  const handleResendVerificationEmail = (id: string) => {
    setTimeout(() => {
      setEmails((prev) =>
        prev.map((e) => (e.id === id ? { ...e, isVerified: true } : e))
      );
    }, 1500);
  };

  // --- Handlers: Phone ---
  const handleAddPhone = (newNumber: string) => {
    const newEntry: PhoneItem = {
      id: `phone-${Date.now()}`,
      number: newNumber,
      isPrimary: phones.length === 0,
      isVerified: false,
    };
    setPhones((prev) => [...prev, newEntry]);
    setActivities((prev) => [
      {
        id: `activity-${Date.now()}`,
        title: "Phone number added",
        description: `Added ${newNumber} to your account.`,
        date: "Just now",
      },
      ...prev,
    ]);
  };

  const handleRemovePhone = (id: string) => {
    const phoneToRemove = phones.find((p) => p.id === id);
    setPhones((prev) => prev.filter((p) => p.id !== id));
    if (phoneToRemove) {
      setActivities((prev) => [
        {
          id: `activity-${Date.now()}`,
          title: "Phone number removed",
          description: `Removed ${phoneToRemove.number} from your account.`,
          date: "Just now",
        },
        ...prev,
      ]);
    }
  };

  const handleSetPrimaryPhone = (id: string) => {
    setPhones((prev) =>
      prev.map((p) => ({
        ...p,
        isPrimary: p.id === id,
      }))
    );
  };

  const handleVerifyPhone = (id: string) => {
    setTimeout(() => {
      setPhones((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isVerified: true } : p))
      );
    }, 1500);
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
          Security
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
          Manage your account access, verification methods, notifications, and
          recent security activity.
        </p>
      </header>

      <div className="space-y-5">
        <SecuritySection
          title="Email & Phone Numbers"
          description="Manage the contact methods connected to your account."
        >
          <SecurityRow
            title="Email addresses"
            description={`${primaryEmail} is your primary email address (${emails.length} total).`}
            status={
              <span className="rounded-full border border-emerald-900/70 bg-emerald-950/50 px-2 py-0.5 text-xs font-medium text-emerald-300">
                Verified
              </span>
            }
            action={
              <button
                type="button"
                onClick={() => setIsEmailDialogOpen(true)}
                className="w-full rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800 sm:w-auto"
              >
                Manage
              </button>
            }
          />

          <SecurityRow
            title="Phone number"
            description={
              primaryPhone
                ? `${primaryPhone.number} is your primary phone number (${phones.length} total).`
                : "No phone number has been added to your account yet."
            }
            status={
              primaryPhone ? (
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                    primaryPhone.isVerified
                      ? "border-emerald-900/70 bg-emerald-950/50 text-emerald-300"
                      : "border-amber-900/70 bg-amber-950/50 text-amber-300"
                  }`}
                >
                  {primaryPhone.isVerified ? "Verified" : "Pending"}
                </span>
              ) : undefined
            }
            action={
              <button
                type="button"
                onClick={() => setIsPhoneDialogOpen(true)}
                className="w-full rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800 sm:w-auto"
              >
                {phones.length > 0 ? "Manage" : "Add phone"}
              </button>
            }
          />
        </SecuritySection>

        <SecuritySection
          title="Security"
          description="Strengthen access protection for your account."
        >
          <SecurityRow
            title="Password"
            description="Last changed on Aug 24, 2026."
            action={
              <button
                type="button"
                className="w-full rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800 sm:w-auto"
              >
                Change password
              </button>
            }
          />

          <SecurityRow
            title="Two-step verification"
            description="Add an additional verification step when signing in."
            status={
              <span className="rounded-full border border-amber-900/70 bg-amber-950/50 px-2 py-0.5 text-xs font-medium text-amber-300">
                Not enabled
              </span>
            }
            action={
              <button
                type="button"
                className="w-full rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800 sm:w-auto"
              >
                Set up
              </button>
            }
          />

          <SecurityRow
            title="Active sessions"
            description="Review the devices currently signed in to your account."
            action={
              <button
                type="button"
                className="w-full rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800 sm:w-auto"
              >
                View sessions
              </button>
            }
          />
        </SecuritySection>

        <SecuritySection
          title="Security Notifications"
          description="Choose how you want to receive security-related account alerts."
        >
          <SecurityRow
            title="Security email alerts"
            description="Important security emails are always sent to your primary email address."
            status={
              <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-300">
                Always on
              </span>
            }
          />

          <SecurityRow
            title="Optional email notifications"
            description="Control optional account updates separately for each verified email address."
            action={
              <button
                type="button"
                onClick={() => setIsEmailDialogOpen(true)}
                className="w-full rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800 sm:w-auto"
              >
                Manage emails
              </button>
            }
          />
        </SecuritySection>

        <SecuritySection
          title="Last Activity"
          description="Recent security-related actions on your account."
        >
          <LastActivityList activities={activities} />
        </SecuritySection>
      </div>

      {/* Feature Dialogs */}
      <EmailManagementDialog
        isOpen={isEmailDialogOpen}
        onClose={() => setIsEmailDialogOpen(false)}
        emails={emails}
        onAddEmail={handleAddEmail}
        onRemoveEmail={handleRemoveEmail}
        onSetPrimary={handleSetPrimaryEmail}
        onToggleNotifications={handleToggleNotifications}
        onResendVerification={handleResendVerificationEmail}
      />

      <PhoneManagementDialog
        isOpen={isPhoneDialogOpen}
        onClose={() => setIsPhoneDialogOpen(false)}
        phones={phones}
        onAddPhone={handleAddPhone}
        onRemovePhone={handleRemovePhone}
        onSetPrimary={handleSetPrimaryPhone}
        onVerifyPhone={handleVerifyPhone}
      />
    </main>
  );
};

export default SecurityPage;
