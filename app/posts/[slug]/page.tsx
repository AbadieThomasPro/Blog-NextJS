import { MdxRemote } from "@/features/mdx/MdxRemote";
import { getPost } from "@/lib/Post-utils";
import { notFound } from "next/navigation";

export default async function RoutePage(props: { params: { slug: string } }) {
    const post = await getPost(props.params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="prose prose-sm lg:prose-lg">
            <p className="text-muted-foreground text-xs">
                {new Date(post?.publishingAt).toLocaleDateString()}
            </p>
            <h1>{post?.title}</h1>
            <MdxRemote>{post?.content}</MdxRemote>
        </div>
    )
}