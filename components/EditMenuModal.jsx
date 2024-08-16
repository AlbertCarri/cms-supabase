'use client'

import { useEffect, useState } from "react"
import { SelectEditMenu } from "../utils/supabase/EditMenu"
import { InsertIntoMenu } from "../utils/supabase/InsertIntoMenu"
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const EditMenuModal = ({ closeEditModal, menuId }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [menus, setMenus] = useState([])

    useEffect(() => {
        const loadingMenu = async () => {
            const menuses = await SelectEditMenu({ menuId })
            setMenus(menuses)
            setIsLoading(false)
        }
        loadingMenu()
    }, [isLoading])


    const CloseEditModal = () => {
        closeEditModal()
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        const datas = new FormData(event.target);
        const imageFile = datas.get('file')
        const { data: path, error } = await supabase.storage
            .from('cms-Main')
            .upload(`public/${imageFile.name}`, imageFile, {
                upsert: true,
            })
        const { data: fileURL } = supabase.storage.from("cms-Main").getPublicUrl(path.path)
        if (error) {
            console.log('Error al subir la IMAGEN', path)
        } else {
            console.log('Imagen subida correctamente')
        }
        const dataObject = Object.fromEntries(datas.entries());
        const formDataObject = { ...dataObject }
        delete formDataObject.file
        InsertIntoMenu({ fileURL, formDataObject, categoryId })
        closeModal()

    }

    if (isLoading) return <p>Is Loading....</p>

    return (

        <div className="modal-overlay" onClick={CloseEditModal}>
            <div className="modal w-96" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col foreground-dark text-start'>
                        <label htmlFor='name' className='mb-2'>Nuevo Menú</label>
                        <input
                            type='text'
                            id='name'
                            name="name"
                            value={menus[0].name}
                            className='mb-8 p-2 bg-gray-300 rounded-lg'
                        />

                        <label htmlFor='description' className='mb-2' >Descripción</label>
                        <input
                            type='text'
                            name="description"
                            id='description'
                            value={menus[0].description}
                            className='mb-8 p-2 bg-gray-300 rounded-lg'
                        />

                        <input className='mb-8' name='file' type='file' accept='jpg,png,bmp' value={menus[0].image} />
                        <label htmlFor='price' className='mb-2'>Precio en $(pesos)</label>
                        <input
                            type='text'
                            name="price"
                            id='price'
                            value={menus[0].precio}
                            className='mb-8 p-2 bg-gray-300 rounded-lg'
                        />

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
                        <button type="button" className='button-zinc px-4 rounded-lg mx-2 p-2' onClick={CloseEditModal}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
