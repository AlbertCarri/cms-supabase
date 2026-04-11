"use client";

import React, { useState } from "react";
import { createClient } from "../app/lib/supabase/client";

export const NewCategory = ({ userId, restoId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInsertCategory = async () => {
    const supabase = createClient();

    const { data } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("category")
      .insert([{ name: inputValue, user_id: data.user.id, resto_id: restoId }]);

    if (error) console.error("ERROR:::", error);
  };

  return (
    <div>
      <button
        className="button-purple rounded-2xl w-48 h-14 sm:w-96 p-4"
        onClick={openModal}
      >
        Agregar Categoria
      </button>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal w-96" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleInsertCategory}>
              <div className="flex flex-col foreground-dark">
                <label htmlFor="changeName" className="mb-2">
                  Nueva Categoria
                </label>
                <input
                  type="text"
                  id="changeName"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="mb-8 p-2 bg-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-row justify-center">
                <button
                  type="submit"
                  className="btn-sky px-4 rounded-lg mx-2 p-2"
                >
                  Aceptar
                </button>
                <button
                  type="button"
                  className="btn-zinc px-4 rounded-lg mx-2 p-2"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
