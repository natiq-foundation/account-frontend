import { AppBar } from "./AppBar";
import { IntroSection } from "./IntroSection";
import Footer from "./Footer";

export default function IntroPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <AppBar />

            <div className="flex-1">
                <IntroSection />
            </div>

            <Footer />
        </div>
    );
}
