"use client";

import { palettes } from "../app/lib/palettes";
import { useRef, useState } from "react";
import MasInfo from "./MasInfo";

export default function MenuClient({ MenuList }) {
  const category = MenuList.category;
  const palette = palettes[MenuList.palette - 1];
  const resto_name = MenuList.resto_name;
  const categoryRef = useRef({});
  const [masInfo, setMasInfo] = useState(false);

  const handleCategoryScroll = (catId) => {
    categoryRef.current[catId].scrollIntoView({
      behavior: "smooth",
    });
  };

  const closeMasInfo = () => {
    setMasInfo(false);
  };

  return (
    <div
      className="menu w-full"
      style={{
        background: `${palette.background}`,
        color: `${palette.text}`,
      }}
    >
      <img
        src={`${MenuList.banner}`}
        alt="banner del resto"
        className="w-full h-32 object-cover"
      />
      <img
        src={`${MenuList.logo}`}
        alt="logo del resto"
        className="w-36 h-36 mx-auto -mt-20"
      />
      <h1 className="text-4xl text-center">{resto_name}</h1>
      <h2 className="text-xl text-center">{MenuList.type}</h2>
      <div className="flex justify-center mt-4">
        <button
          type="button"
          className="text-xs opacity-75 cursor-pointer"
          onClick={() => setMasInfo(true)}
        >
          Más info...
        </button>
      </div>
      {masInfo && (
        <MasInfo
          closeMasInfo={closeMasInfo}
          adress={MenuList.adress}
          schedule={MenuList.schedule}
          socialmedia={MenuList.socialmedia}
        />
      )}
      <div className="flex w-11/12 mx-auto gap-2 mt-8 overflow-scroll">
        {category.map((categ) => (
          <button
            key={categ.name}
            style={{ background: `${palette.button1}` }}
            className="min-w-24 h-20 text-xs rounded-xl overflow-hidden"
            onClick={() => handleCategoryScroll(categ.id)}
          >
            {categ.name}
          </button>
        ))}
      </div>
      <div className="w-11/12 mx-auto mt-8">
        {category.map((categ) => (
          <div
            key={categ.id}
            ref={(element) => (categoryRef.current[categ.id] = element)}
            style={{
              backgroundColor: `${palette.button1}4f`,
              border: `1px solid ${palette.text}`,
            }}
            className="flex flex-col py-4 px-4 rounded-md mb-4"
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
                        <p
                          key={alerg}
                          className="label-emerald text-xs line-clamp-1 md:line-clamp-none rounded-sm px-1 mr-2 mb-4"
                        >
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
