import Link from "next/link"

export const GoBack = () => {
    return (
        <Link
            href="/main"
            className="flex -m-1 justify-center no-underline py-2 px-4 h-10 w-24 rounded-md button-zinc"
        ><p>Back</p> 
        </Link>
    )
}
//absolute left-8 top-8 py-2 px-4 rounded-md no-underline foreground-light button-zinc hover:button-background-zinc-hover flex items-center group text-sm