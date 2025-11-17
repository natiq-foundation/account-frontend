"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
            <Card className="w-full max-w-sm shadow-md border-border">
                <CardHeader className="text-center">
                    <CardTitle>Welcome</CardTitle>
                </CardHeader>

                <Separator className="mb-4" />

                <CardContent className="flex flex-col gap-3">
                    <Button className="w-full">Account</Button>
                    <Button variant="outline" className="w-full">
                        Login
                    </Button>
                </CardContent>
            </Card>
        </main>
    )
}
