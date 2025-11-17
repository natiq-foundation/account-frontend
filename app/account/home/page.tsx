import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
export default function Profile() {
    const basicItems = [
        { label: "Age", value: "24" },
        { label: "Country", value: "Iran" },
        { label: "City", value: "Tehran" },
    ]

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-sm space-y-6">

                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
                        <AvatarFallback>EX</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <p className="text-lg font-semibold">First Name</p>
                        <p className="text-sm text-muted-foreground">example@example.com</p>
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <h3 className="text-base font-medium">Basic Info</h3>

                    <Card>
                        <CardContent className="p-4 space-y-3">
                            {basicItems.map((item) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">{item.label}</span>
                                    <span className="text-sm font-medium">{item.value}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}


