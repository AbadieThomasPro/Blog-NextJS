import Link from "next/link"

export const Header = () => {
    return (
        <header className="flex items-center gap-2 border px-2 py-2 bg-card rounded-lg shadow-xl my-4">
            <p>Codelynx<span className="text-primary">.dev</span></p>
            <div className="ml-auto"></div>
            <Link rel="stylesheet" href="/">
                Posts
            </Link>
        </header>

    )
}