import { getPosts } from "@/lib/Post-utils";

export default async function Home() {
  const fileNames = await getPosts(); // Appel direct à la fonction

  if (!Array.isArray(fileNames)) {
    console.error("Les fichiers récupérés ne sont pas un tableau :", fileNames);
    return <div>Erreur lors de la récupération des fichiers.</div>;
  }

  return (
    <ul className="list-dics list-inside">
      {fileNames.map((fileName) => (
        <li key={fileName.slug}>{fileName.title}</li>
      ))}
    </ul>
  );
}