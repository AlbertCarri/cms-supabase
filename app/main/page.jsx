import AuthButton from "../../components/AuthButton";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation"
import { RestoName } from "../../components/RestoName";
import { ChangeRestoName } from "../../components/ChangeRestoName";
import { NewCategory } from "../../components/NewCategory";
import { ShowCategory } from "../../components/ShowCategory"
import { ShowQr } from "../../components/ShowQr";

export default async function ProtectedPage() {
    const supabase = createClient();

    const { data: { user }, } = await supabase.auth.getUser();
    if (!user) {
        return redirect("/login");
    }
    /*const { data: urlQr, error } = await supabase.from('users').select('qr_url').eq('user_uid', user.id)
    if (error) console.error('Error de Consulta:', error)*/

    const { data: resto_name, error } = await supabase.from('users').select('resto_name').eq('user_uid', user.id)
    const urlQr = 'https://cms-resto.vercel.app/menu/' + resto_name[0].resto_name
    console.log('urlQR::::::::::', urlQr)
    if (error) console.error('Error de Consulta:', error)


    return (
        <div className="flex-1 w-9/12 flex flex-col gap-10 items-center">

            <div className="w-full">
                <nav className="w-full flex justify-end h-16 p-4">
                    <AuthButton />
                </nav>
                <div className="w-full border-zinc-500 border-t p-2 flex justify-center"></div> {/* línea separadora*/}
            </div>
            <div className="flex flex-row" >
                <div className="basis-full">

                    <h2 className="foreground-light">Nombre del Restó :</h2>
                    <div className="flex flex-row">
                        <RestoName userId={user.id} />
                        <ChangeRestoName userId={user.id} />
                    </div>
                    <div className="mt-16">
                        <NewCategory userId={user.id} />
                    </div>
                    <div>
                        <ShowCategory userId={user.id} />
                    </div>
                    <div className="basis-1/2 block lg:hidden p-8">
                        {/*<ShowQr urlQr={urlQr[0].qr_url} fileName={'codigoQR'} />*/}
                        <ShowQr urlQr={urlQr} fileName={'codigoQR'} />
                    </div>
                </div>
                <div className="basis-1/2 hidden lg:block p-8">
                    {/*<ShowQr urlQr={urlQr[0].qr_url} />*/}
                    <ShowQr urlQr={urlQr} />

                </div>
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
    );
}
