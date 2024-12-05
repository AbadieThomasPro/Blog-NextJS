import { getPosts } from "@/lib/Post-utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export default async function Home() {

  const posts = await getPosts(); // Appel direct à la fonction

  // if (!Array.isArray(fileNames)) {
  //   console.error("Les fichiers récupérés ne sont pas un tableau :", fileNames);
  //   return <div>Erreur lors de la récupération des fichiers.</div>;
  // }

  return (
    <div className="space-y-4">
      {
        posts.map((post) => (
          <Card key={post.slug}>

            <CardHeader>
              <p className="text-muted-foreground text-xs">{new Date(post.publishingAt).toLocaleDateString()}</p>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>

            <CardFooter>
              <Link href={`/posts/${post.slug}`} className="text-blue-500 hover:underline">
                Read more
              </Link>
            </CardFooter>

          </Card>
        ))
      }

    </div>
  );
}