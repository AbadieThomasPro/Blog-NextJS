// Venir récupérer statiquement tous les post présent dans content

import path from "path";
import fs from "fs/promises"

const postsDirectory = path.join(process.cwd(), "content");

export const getPosts = () => async () => {
    const files = await fs.readdir(postsDirectory);
    const filesNames = files.filter(f => f.endsWith(".mdx"));

    console.log(filesNames)

    return filesNames;
}