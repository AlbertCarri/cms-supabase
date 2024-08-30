'use client';

import React, { useState } from 'react';
import { RestoNameChange } from '../utils/supabase/UpdateRestoName';

export const ChangeRestoName = ({ userId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('')

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const UpdateRestoName = () => {
        setIsModalOpen(false);
        RestoNameChange({ userId, inputValue })
    }

    return (
        <div>
            <button className="button-sky px-4 rounded-lg mx-2 p-2" onClick={openModal}>
                Cambiar
            </button>
            {isModalOpen && (

                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <form>
                            <div className='flex flex-col foreground-dark'>
                                <label for="changeName" className='mb-2'>Cambiar Nombre</label>
                                <input
                                    type='text'
                                    id="changeName"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className='mb-8 p-2 bg-gray-300 rounded-lg'
                                />
                            </div>
                            <button type="button" className='btn-sky px-4 rounded-lg mx-2 p-2' onClick={UpdateRestoName}>Aceptar</button>
                            <button type="button" className='btn-zinc px-4 rounded-lg mx-2 p-2' onClick={closeModal}>Cancelar</button>
                        </form>
                    </div>
                </div>

            )}
        </div>
    );
};