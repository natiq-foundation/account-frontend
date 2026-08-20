import { Button } from "@/components/ui/button";
import { getCountries } from "@yakad/lib";
import { Flag } from "@yakad/symbols";

export function IntroSection() {
    return (
        <section className="flex justify-center px-6 pt-32">
            <div className="elevation-2 flex w-full max-w-6xl flex-col items-center gap-16 rounded-[28px] bg-surface-container p-12 md:flex-row">
                {getCountries().map((country) => (
                    <div key={country.alpha2Code} className="h-20 w-20">
                        {country.name}
                        <Flag code={country.alpha2Code} />
                    </div>
                ))}
                <Button>Login</Button>
                <Button>Account</Button>
            </div>
        </section>
    );
}
