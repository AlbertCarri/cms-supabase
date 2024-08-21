import AuthButton from "../../../components/AuthButton";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation"
import { NewMenu } from "../../../components/NewMenu";
import { GoBack } from "../../../components/GoBack";

export default async function Menu({ params }) {

    const name = params.slug[1]
    const categoryId = params.slug[0]

    const supabase = createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    if (!user) {

        return redirect("/login");
    }

    return (

        <div className="flex-1 w-11/12 flex flex-col gap-10 items-center">

            <div className="w-full">
                <nav className="w-full flex justify-between h-16 p-4">
                    <GoBack />
                    <AuthButton />
                </nav>
                <div className="w-full border-zinc-500 border-t p-2 flex justify-center"></div> {/* línea separadora*/}
            </div>

            <div className="w-full text-center">
                <p className="foreground-light text-4xl mb-10">{name}</p>
                <NewMenu categoryId={categoryId} />
                
            </div>
            <footer className="w-full border-t border-zinc-500 p-8 flex justify-center text-center text-xs">
                <p>
                    Powered by{" "}
                    <a
                        href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                        target="_blank"
                        className="font-bold hover:underline"
                        rel="noreferrer"
                    >
                        Supabase
                    </a>
                </p>
            </footer>
        </div>
    )
}