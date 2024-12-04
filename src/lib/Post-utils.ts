import path from "path";
import fs from "fs/promises";
import { z } from "zod";
import matter from "gray-matter";

// Répertoire contenant les fichiers
const postsDirectory = path.join(process.cwd(), "content");

const PostSchema = z.object({
    title: z.string().min(45).max(65), //oblige à mettre plus 45char pour l'optimisation SEO du titre (50-60)
    description: z.string(),
    publishingAt: z.coerce.string(),
})

type Post = z.infer<typeof PostSchema> & {
    slug: string; //nom du fichier
    content: string;
}

// Fonction pour récupérer les fichiers
export const getPosts = async () => {
    const files = await fs.readdir(postsDirectory);
    const fileNames = files.filter(f => f.endsWith(".mdx")); // Filtre uniquement les fichiers .mdx

    const posts: Post[] = [];

    for await (const fileName of fileNames) {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContent = await fs.readFile(fullPath, "utf-8");// lire les fichiers
        const frontMatter = matter(fileContent);

        const safeData = PostSchema.safeParse(frontMatter.data);

        if (!safeData.success) {
            console.error(`error parsing file: ${fileName}`);
            safeData.error.issues.forEach((issue) => {
                console.log(` - ${issue.path.join(" -> ")}: ${issue.message}`);
            });
            continue;
        }
        posts.push({
            ...safeData.data,
            slug: fileName.replace(".mdx", ""),
            content: frontMatter.content,
        })
    }


    return posts;
};
