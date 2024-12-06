import { MdxRemote } from "@/features/mdx/MdxRemote";
import { getExercises } from "@/lib/Post-utils";
import { notFound } from "next/navigation";

// export default async function RoutePage(props: { params: { slug: string } }) {
//     const exercice = await getExercises (props.params.slug);

//     if (!exercice) {
//         notFound;
//     }

//     return (
//         <div className="prose prose-sm lg:prose-lg">
//             <p className="text-muted-foreground text-xs">
//                 {new Date(exercice?.publishingAt).toLocaleDateString()}
//             </p>
//             <h1>{exercice?.title}</h1>
//             <MdxRemote>{exercice?.content}</MdxRemote>
//         </div>
//     )
// }