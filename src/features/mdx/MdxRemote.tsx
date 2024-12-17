import { MDXRemote } from "next-mdx-remote-client/rsc"
import { Suspense } from "react"
import { MDX_COMPONENTS } from "./mdx-component"

export const MdxRemote = ({ children }: { children: string }) => {
    return < Suspense fallback={< div > loading... </div >}>
        <MDXRemote source={children} components={MDX_COMPONENTS} />
    </Suspense>
}