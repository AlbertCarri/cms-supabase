import { createClient } from "./lib/supabase/server";
import MainIntro from "../components/MainIntro";
import NavMenu from "../components/NavMenu";
import { ClientButton } from "../components/ClientButton";
import FooterMain from "../components/FooterMain";

export default async function Index() {
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      console.log('error de logeo:')
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex flex-col items-center xl:max-w-[1440px]">
      <header className="w-full">
        <NavMenu />
      </header>
      <MainIntro />
      {isSupabaseConnected && (
        <>
          <ClientButton>Comenzar</ClientButton>
        </>
      )}
      <FooterMain />
    </div>
  );
}
