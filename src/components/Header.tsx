import Link from "next/link"

export const Header = () => {
    return (
        <header className="flex items-center gap-2 border px-3 py-2 bg-card rounded-lg shadow-xl my-4">
            <Link href={"/"} className="font-mono">
                Codelynx<span className="text-primary">.dev</span>
            </Link>
            <div className="ml-auto"></div>
            <Link rel="stylesheet" href="/posts">
                Posts
            </Link>
            <Link href={"/exercices"}>Exo</Link>
        </header>

    )
}