import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Welcome</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="mb-4 text-muted-foreground">Your Shadcn UI is working perfectly 🎯</p>
                    <Button>Let’s Go</Button>
                </CardContent>
            </Card>
        </main>
    )
}
