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
    published: z.boolean().optional().default(false)
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

        if (!safeData.data.published && process.env.NODE_ENV !== "development") {
            continue;
        }

        posts.push({
            ...safeData.data,
            slug: fileName.replace(/^\d+-/, "").replace(".mdx", ""), // enlève dans le lien 001 et .mdx
            content: frontMatter.content,
        })
    }


    return posts;
};


export const getPost = async (slug: string) => {
    const posts = await getPosts();
    return posts.find((post) => post.slug === slug);
}








//EXERCICE
const exercisesDirectory = path.join(process.cwd(), "exercices");

const ExerciseSchema = z.object({
    title: z.string(),
    description: z.string(),
    difficulty: z.string(), // Par exemple : "Facile", "Moyen", "Difficile"
    publishingAt: z.coerce.string(),
    published: z.boolean().optional().default(false)
});

type Exercise = z.infer<typeof ExerciseSchema> & {
    slug: string; // Nom du fichier
    content: string;
};
export const getExercises = async () => {
    const files = await fs.readdir(exercisesDirectory);
    const fileNames = files.filter(f => f.endsWith(".mdx")); // files.filter(f => f.match(/^\d{3}-Exercice.*\.mdx$/)); filtre uniquement les fichiers qui commencent par un numéro suivi de "-Exercice"

    const exercises: Exercise[] = [];

    for await (const fileName of fileNames) {
        const fullPath = path.join(exercisesDirectory, fileName);
        const fileContent = await fs.readFile(fullPath, "utf-8"); // Lire les fichiers
        const frontMatter = matter(fileContent);

        const safeData = ExerciseSchema.safeParse(frontMatter.data);

        if (!safeData.success) {
            console.error(`Erreur d'analyse du fichier: ${fileName}`);
            safeData.error.issues.forEach((issue) => {
                console.log(` - ${issue.path.join(" -> ")}: ${issue.message}`);
            });
            continue;
        }

        exercises.push({
            ...safeData.data,
            slug: fileName.replace(".mdx", ""),
            content: frontMatter.content,
        });
    }

    return exercises;
}