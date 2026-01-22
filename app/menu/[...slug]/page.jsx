import { CompleteMenu } from "../../../utils/supabase/CompleteMenu";

export default async function MenuC({ params }) {
  const resto_name = params.slug[0].replaceAll("_", " ");
  const MenuList = await CompleteMenu({ resto_name });
  const category = MenuList.category;

  return (
    <div className="menu w-full">
      <div className="w-11/12 mx-auto">
        <h2 className="text-4xl my-8 text-center">{MenuList.resto_name}</h2>
        {category.map((categ) => (
          <div
            key={categ.id}
            className="menu-card flex flex-col py-4 px-4 rounded-md border border-black mb-4"
          >
            <p className="text-2xl mb-4 text-left">{categ.name}:</p>

            {categ.menu.map((category_menu) => (
              <div key={category_menu.id}>
                {category_menu.checked && (
                  <div>
                    <div className="flex flex-row justify-center">
                      <div className="basis-40">
                        <div className="rounded-lg mr-4 items-center w-28 h-28 overflow-hidden">
                          <img
                            className="w-full h-full object-cover"
                            src={category_menu.image}
                            alt="Food"
                          />
                        </div>
                      </div>
                      <div className="basis-96">
                        <p className="text-md mb-2 underline underline-offset-4">
                          {category_menu.name}
                        </p>
                        <p className="text-xs mb-1 h-16">
                          {category_menu.description}
                        </p>
                        <p className="text-md mb-1">
                          Precio ${category_menu.price}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs mb-1">Alergenos:</p>
                    <div className="flex flex-row justify-center">
                      {category_menu.alergens.map((alerg) => (
                        <p className="label-emerald text-xs line-clamp-1 md:line-clamp-none rounded-sm px-1 mr-2 mb-4">
                          {alerg}
                        </p>
                      ))}
                    </div>
                    <div className="w-full border-zinc-500 border-t p-2 flex justify-center"></div>{" "}
                    {/* línea separadora*/}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
