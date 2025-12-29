"use client";

import { useState, useEffect } from "react";
import { SelectCategoryTable } from "../utils/supabase/SelectCategoryTable";
import { DeleteCategoryTable } from "../utils/supabase/DeleteCategoryTable";
import { useRouter } from "next/navigation";

export const ShowCategory = ({ userId }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [categoryDelete, setCategoryDelete] = useState([]);
  const router = useRouter();

  const deleteCategory = () => {
    DeleteCategoryTable(categoryDelete[0]);
    setModal(false);
    setLoading(true);
    setCategoryDelete([]);
  };

  const deleteConfirm = (categoryId, categoryName) => {
    setCategoryDelete([categoryId, categoryName]);
    setModal(true);
  };

  const editMenu = (id, categoryname) => {
    router.push(`/main/${id}/${categoryname.replaceAll(" ", "_")}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categor = await SelectCategoryTable({ userId });
      setCategories(categor);
      setLoading(false);
    };
    fetchCategories();
  }, [loading]);

  if (loading) {
    return <p>Loading............</p>;
  }

  return (
    <div className="flex flex-col">
      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal flex flex-col">
            <div className="foreground-dark text-center mb-4">
              <p> Deseas eliminar {categoryDelete[1]}?</p>
            </div>
            <div>
              <button
                type="submit"
                className="btn-sky px-4 rounded-lg mx-2 p-2"
                onClick={deleteCategory}
              >
                Aceptar
              </button>
              <button
                type="button"
                className="btn-zinc px-4 rounded-lg mx-2 p-2"
                onClick={() => setModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {categories.map((category) => (
        <div key={category.id} className="flex flex-row mt-10">
          <button
            className="button-purple rounded-2xl w-48 h-14 sm:w-96 p-4"
            onClick={() => editMenu(category.id, category.name)}
          >
            {category.name}
          </button>
          <button
            className="button-red rounded-2xl ml-10 w-32 sm:w-40"
            onClick={() => deleteConfirm(category.id, category.name)}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};
