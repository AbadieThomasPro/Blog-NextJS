import { getExercises } from "@/lib/Post-utils";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export default async function Posts() {
    const exercices = await getExercises();

    return (
        <div className="space-y-4">
            {
                exercices.map((exercice) => (
                    <Card key={exercice.slug}>

                        <CardHeader>
                            <p className="text-muted-foreground text-xs">{new Date(exercice.publishingAt).toLocaleDateString()}</p>
                            <CardTitle>{exercice.title}</CardTitle>
                            <CardDescription>{exercice.description}</CardDescription>
                        </CardHeader>

                        <CardFooter>
                            <Link href={`/posts/${exercice.slug}`} className="text-blue-500 hover:underline">
                                Read more
                            </Link>
                        </CardFooter>

                    </Card>
                ))
            }

        </div>
    );
}