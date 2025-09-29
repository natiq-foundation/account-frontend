import { Container, H1 } from "@yakad/ui";
import { ResetButton } from "@/components/buttons/ResetButton";
import PreferencesSection from "./PreferencesSection";

export default function Page() {
    return (
        <>
            <Container size="md">
                <H1 variant="heading3">Preferences</H1>
            </Container>
            <Container size="sm" align="center">
                <PreferencesSection />
                <ResetButton />
            </Container>
        </>
    );
}
