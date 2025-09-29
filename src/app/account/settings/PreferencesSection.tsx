import { GridContainer, GridItem } from "@yakad/ui";
import { LanguageSelect } from "@/components/forms/LanguageSelect";
import { DarkStyleButton } from "@/components/buttons/DarkStyleButton";
import { ColorButton } from "@/components/buttons/ColorButton";
import { ZoomButton } from "@/components/buttons/ZoomButton";

export default function PreferencesSection() {
    return (
        <>
            <GridContainer columns={3}>
                <GridItem>
                    <DarkStyleButton variant="filled" />
                </GridItem>
                <GridItem>
                    <ColorButton variant="filled" />
                </GridItem>
                <GridItem>
                    <ZoomButton variant="filled" />
                </GridItem>
            </GridContainer>
            <LanguageSelect />
        </>
    );
}
