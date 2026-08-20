import { Button } from "@/components/ui/button";
import { getCountries } from "@yakad/lib";
import { Flag } from "@yakad/symbols";

export function IntroSection() {
    return (
        <section className="px-6 pt-32 flex justify-center">
            <div className="max-w-6xl w-full rounded-[28px] bg-surface-container elevation-2 p-12 flex flex-col md:flex-row items-center gap-16">
                {getCountries().map((country) => (
                    <div key={country.alpha2Code} className="w-20 h-20">
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
