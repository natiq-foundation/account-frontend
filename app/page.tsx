import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <div className="flex gap-4">
        <Link href="/login">
          <Button variant="default">Login</Button>
        </Link>
        <Link href="/account/home">
          <Button variant="secondary">Account</Button>
        </Link>
      </div>
    </main>
  );
}
