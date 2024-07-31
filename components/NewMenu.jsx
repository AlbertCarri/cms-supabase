'use client';

import React, { use, useState } from 'react';
import { InsertIntoMenu } from '../utils/supabase/InsertIntoMenu';
import { createClient } from '@supabase/supabase-js'
import { ShowMenu } from './ShowMenu';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const NewMenu = ({ categoryId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState({})
    const [ShowMe, setShowMe] = useState(true)

    const openModal = () => {
        console.log('Opening Modal');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowMe(false)
        console.log('Event:::::', event)

        const datas = new FormData(event.target);
        const imageFile = datas.get('file')
        console.log('Datas ---->', datas)

        const { data: path, error } = await supabase.storage
            .from('cms-Main')
            .upload(`public/${imageFile.name}`, imageFile, {
                upsert: true,
            })

        const { data: fileURL } = supabase.storage.from("cms-Main").getPublicUrl(path.path)
        console.log('Storage::::', fileURL)
        if (error) {
            console.log('Error al subir la IMAGEN', path)
        } else {
            console.log('Imagen subida correctamente')
        }

        console.log('data::::::', datas)
        const dataObject = Object.fromEntries(datas.entries());
        const formDataObject = { ...dataObject }
        delete formDataObject.file
        setInputValue(formDataObject);
        console.log('formDataObjet:::::', inputValue, formDataObject);
        InsertIntoMenu({ fileURL, formDataObject, categoryId })
        setIsModalOpen(false)
        setShowMe(true)
    }

    return (
        <div>
            <button className="button-sky px-32 rounded-lg p-4" onClick={openModal}>
                Agregar Menú
            </button>
            {isModalOpen && (

                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal w-96" onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col foreground-dark text-start'>
                                <label className='mb-2'>Nuevo Menú
                                    <input
                                        type='text'
                                        name="name"

                                        className='mb-8 p-2 bg-gray-300 rounded-lg'
                                    />
                                </label>
                                <label className='mb-2' >Descripción
                                    <input
                                        type='text'
                                        name="description"

                                        className='mb-8 p-2 bg-gray-300 rounded-lg'
                                    />
                                </label>
                                <input className='mb-8' name='file' type='file' accept='jpg,png,bmp' />
                                <label className='mb-2'>Precio en $(pesos)
                                    <input
                                        type='text'
                                        name="price"

                                        className='mb-8 p-2 bg-gray-300 rounded-lg'
                                    />
                                </label>
                                <p className='mb-4'>Alergenos:</p>
                                <div className='flex flex-row text-md justify-between'>
                                    <label>
                                        <input
                                            name='gluten'
                                            type='checkbox'
                                            className='mb-8 p-2 bg-gray-300 rounded-lg'
                                        />Gluten</label>
                                    <label>
                                        <input
                                            name='crustaceos'
                                            type='checkbox'
                                            className='mb-8 p-2 bg-gray-300 rounded-lg'
                                        />Crustáceos</label>
                                    <label>
                                        <input
                                            type='checkbox'
                                            name='huevo'
                                            className='mb-8 p-2 bg-gray-300 rounded-lg'
                                        />Huevos</label>
                                    <label>
                                        <input
                                            type='checkbox'
                                            name='pescado'
                                            className='mb-8 p-2 bg-gray-300 rounded-lg'
                                        />Pescado</label>
                                </div>
                                <div className='flex flex-row text-md justify-between'>
                                    <label>
                                        <input
                                            type='checkbox'
                                            name='leche'
                                            className='mb-8 p-2 bg-gray-300 rounded-lg'
                                        />Leche</label>
                                    <label>
                                        <input
                                            type='checkbox'
                                            name='soja'
                                            className='mb-8 p-2 bg-gray-300 rounded-lg'
                                        />Soja</label>
                                    <label>
                                        <input
                                            type='checkbox'
                                            name='mani'
                                            className='mb-8 p-2 bg-gray-300 rounded-lg'
                                        />Maní</label>
                                    <label>
                                        <input
                                            type='checkbox'
                                            name='frutossecos'
                                            className='mb-8 p-2 bg-gray-300 rounded-lg'
                                        />Frutos secos</label>
                                </div>
                            </div>
                            <div className='flex flex-row justify-center'>
                                <button type="submit" className='button-sky px-4 rounded-lg mx-2 p-2' >Aceptar</button>
                                <button type="button" className='button-zinc px-4 rounded-lg mx-2 p-2' onClick={closeModal}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {ShowMe &&
                <div className="flex flex-row mt-10">
                    <ShowMenu categoryId={categoryId} />
                </div>}
        </div>
    );
};