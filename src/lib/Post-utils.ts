import path from "path";
import fs from "fs/promises";

// Répertoire contenant les fichiers
const postsDirectory = path.join(process.cwd(), "content");

// Fonction pour récupérer les fichiers
export const getPosts = async () => {
    const files = await fs.readdir(postsDirectory);
    const fileNames = files.filter(f => f.endsWith(".mdx")); // Filtre uniquement les fichiers .mdx
    console.log(fileNames); // Vérifiez les fichiers trouvés
    return fileNames;
};
