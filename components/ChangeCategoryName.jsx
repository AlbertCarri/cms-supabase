"use client";

import React, { useState } from "react";
import { updateCategoryName } from "../utils/supabase/updateCategoryName";

export const ChangeCategoryName = ({ categoryId, name }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState(name);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const editCategoryName = () => {
    setIsModalOpen(false);
    updateCategoryName({ categoryId, inputValue });
  };

  return (
    <div>
      <div className="flex flex-row mb-4 justify-center items-center">
        <p className="foreground-light text-4xl">{inputValue}</p>
        <button
          className="button-sky px-4 py-2 ml-4 rounded-lg"
          onClick={openModal}
        >
          ✍
        </button>
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <form>
              <div className="flex flex-col foreground-dark">
                <label htmlFor="changeName" className="mb-2">
                  Cambiar Nombre
                </label>
                <input
                  type="text"
                  id="changeName"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="mb-8 p-2 bg-gray-300 rounded-lg"
                />
              </div>
              <button
                type="button"
                className="btn-sky px-4 rounded-lg mx-2 p-2"
                onClick={editCategoryName}
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
