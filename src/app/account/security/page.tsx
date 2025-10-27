"use client";

import { type IconCode } from "@yakad/symbols";
import {
  Container,
  H3,
} from "@yakad/ui";
import ButtonGroup, { ListItem } from "./ButtonGroup";
import ActivityGroup from "./ActivityGroup";
import ChangeEmailPopup from "./PopupItems/ChangeEmail/ChangeEmailPopup";
import ChangePhonePopup from "./PopupItems/ChangePhoneNumber/ChangePhonePopup";
import ChangePasswordPopup from "./PopupItems/ChangePassword/ChangePasswordPopup";
import TwoStepPopup from "./PopupItems/TwoStep/TwoStepPopup";
import ChangeTwoFactorPopup from "./PopupItems/TwoFactor/ChangeTwoFactorPopup";
import ChangeRecoveryPopup from "./PopupItems/ChangeRecovery/ChangeRecoveryPopup";
export default function Page() {
  // Email & Phone
  const contactItems: ListItem[] = [
    { label: "example@example.com", icon: "chevron_right", popup: <ChangeEmailPopup />, popuoHeadin: "Your Emails" },
    { label: "+123456789", icon: "chevron_right", popup: <ChangePhonePopup /> },
  ];

  // Security
  const securityItems: ListItem[] = [
    { label: "Change Password", icon: "chevron_right", popup: <ChangePasswordPopup />, },
    { label: "two-step Verify Code", icon: "chevron_right", popup: <TwoStepPopup />, popuoHeadin: "Two-Step Verification" },
    {
      label: "two-factor Verify Authenticator Code",
      icon: "chevron_right",
      popup: <ChangeTwoFactorPopup />

    },
    { label: "Recovery Code", icon: "chevron_right", popup: <ChangeRecoveryPopup /> },
  ];

  // Security Notifications
  const securityNotifs: ListItem[] = [
    {
      label: "Active Security Notifications",
      icon: "notifications_active",
    },
  ];

  // Sessions
  const sessions: ListItem[] = [{ label: "Active Sessions", value: 2 }];

  // Last Activate
  const lastActivates: {
    icon: IconCode;
    title: string;
    subtitle: string;
  }[] = [
      {
        icon: "mobile",
        title: "Security Login",
        subtitle: "Aug 15, 2024, from IP 123,45,678,9",
      },
      {
        icon: "report",
        title: "Security Login",
        subtitle: "Aug 16, 2024, from IP 123,45,678,9",
      },
      {
        icon: "password",
        title: "Password Changed",
        subtitle: "Aug 17, 2024, from IP 123,45,678,9",
      },
    ];

  return (
    <Container size="sm" align="start">
      <H3 variant="heading5">Email & Phone Numbers</H3>
      <ButtonGroup list={contactItems} />

      <H3 variant="heading5">Security</H3>
      <ButtonGroup list={securityItems} />

      <H3 variant="heading5">Security Notifications</H3>
      <ButtonGroup list={securityNotifs} />

      <H3 variant="heading5">Sessions</H3>
      <ButtonGroup list={sessions} />

      <H3 variant="heading5">Last Activate</H3>
      <ActivityGroup list={lastActivates} />
    </Container>
  );
}
