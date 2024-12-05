import { MDXRemote } from "next-mdx-remote-client/rsc"
import { Suspense } from "react"

export const MdxRemote = ({ children }: { children: string }) => {
    return < Suspense fallback={< div > loading... </div >}>
        <MDXRemote source={children} />
    </Suspense>
}