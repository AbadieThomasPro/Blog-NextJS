import { getPosts } from "@/lib/Post-utils";

export default async function Home() {
  const fileNames = await getPosts(); // Fonction pour récupérer les données

  return (
    <div>
      {fileNames.map((fileName) => (
        <div key={fileName}>{fileName}</div>
      ))}
    </div>
  );
}
