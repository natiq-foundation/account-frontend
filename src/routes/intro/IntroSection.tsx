import { Button } from "@/components/ui/button";
import { getCountries } from "@yakad/lib";
// import { Flag, Material, Spinner } from "@yakad/symbols";
import { Link } from "react-router-dom";
export function IntroSection() {
    return (
        <section className="flex justify-center px-6 pt-32">
            <div className="elevation-2 flex w-full max-w-6xl flex-col items-center gap-16 rounded-[28px] bg-surface-container p-12 md:flex-row">
                {getCountries().map((country) => (
                    <div key={country.alpha2Code} className="h-20 w-20">
                        {/* {country.name}
                        <Flag size={"extraLarge"} code={country.alpha2Code}/>
                        <Spinner size={"extraLarge"} variant="scaleOut"/> 
                        <Material icon="home" size={"extraLarge"}/> */}
                    </div>
                ))}
                <Button>
                    <Link to="/auth">Login</Link>
                </Button>
                <Button>
                    <Link to="/launcher">Account</Link>
                </Button>
            </div>
        </section>
    );
}
