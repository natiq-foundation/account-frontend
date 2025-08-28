import { Spacer, Button, Footer, FooterProps } from "@yakad/ui";

export default function FooterWrapper({ ...restProps }: FooterProps) {
    return (
        <Footer {...restProps}>
            <a target="blank" href="https://blog.natiq.net/privacy-policy">
                <Button variant="link">Privacy Policy</Button>
            </a>
            <Spacer />
            <a href="https://blog.natiq.net/vision" target="_blank">
                <Button variant="link">Vision</Button>
            </a>
            <a href="https://blog.natiq.net/team" target="_blank">
                <Button variant="link">Team</Button>
            </a>
            <a href="https://blog.natiq.net/sponsor" target="_blank">
                <Button variant="link">Sponsor</Button>
            </a>
            <a href="https://blog.natiq.net/about" target="_blank">
                <Button variant="link">About</Button>
            </a>
        </Footer>
    );
}
