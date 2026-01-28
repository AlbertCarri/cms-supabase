import { CompleteMenu } from "../../../utils/supabase/CompleteMenu";
import MenuClient from "../../../components/MenuClient";

export default async function MenuC({ params }) {
  const Params = await params;
  const resto_name = Params.slug[0].replaceAll("_", " ");
  const MenuList = await CompleteMenu({ resto_name });

  return <MenuClient MenuList={MenuList} />;
}
