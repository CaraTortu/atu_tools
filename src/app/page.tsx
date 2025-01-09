import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { url_data } from "~/constants";

export default function Page() {
    return (
        <div className="flex flex-1 flex-col gap-16 p-10 pt-4 items-center">
            <div className="flex flex-col justify-center text-center">
                <h1 className="text-2xl lg:text-3xl font-bold">Welcome to the toolbox!</h1>
                <p className="text-md lg:text-lg font-light">This is a collection of tools to help students with their coursework. Select a tool to start!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
                {url_data.map((data) => (
                    <Card key={data.title} className="bg-card transition-colors">
                        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                            <CardTitle className="text-xl font-bold">{data.title}</CardTitle>
                            <data.icon className="w-8 h-8 ml-auto text-primary" />
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm text-muted-foreground mb-4">{data.description}</CardDescription>
                            <ul className="space-y-1">
                                {data.items?.map((tool) => (
                                    <li key={tool.title} className="flex items-center">
                                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                                        <Link href={tool.url} className="text-md">{tool.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
