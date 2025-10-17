import ChangeEmailPopup from "./ChangeEmailPopup";

export default function Page({ searchParams }: { searchParams: { step?: string; email?: string } }) {
    return <ChangeEmailPopup />;
}
