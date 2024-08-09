'use client';

import React, { useState } from 'react';
import { InsertIntoCategory } from '../utils/supabase/InsertIntoCategory';

export const NewCategory = ({ userId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('')

    const openModal = () => {
        console.log('Opening Modal');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const UpdateRestoName = () => {
        RestoNameChange({ userId, inputValue })
    }

    return (
        <div>
            <button className="button-purple px-8 sm:px-32  rounded-lg p-4" onClick={openModal}>
                Agregar Categoria
            </button>
            {isModalOpen && (

                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal w-96" onClick={(e) => e.stopPropagation()}>
                        <form>
                            <div className='flex flex-col foreground-dark'>
                                <label for="changeName" className='mb-2'>Nueva Categoria</label>
                                <input
                                    type='text'
                                    id="changeName"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className='mb-8 p-2 bg-gray-300 rounded-lg'
                                />
                            </div>
                            <div className='flex flex-row justify-center'>
                                <button type="submit" className='button-sky px-4 rounded-lg mx-2 p-2' onClick={() => InsertIntoCategory({userId, inputValue})}>Aceptar</button>
                                <button type="button" className='button-zinc px-4 rounded-lg mx-2 p-2' onClick={closeModal}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>

            )}
        </div>
    );
};