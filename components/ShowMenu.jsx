'use client'

import { useState, useEffect } from 'react';
import { SelectMenuesRow } from '../utils/supabase/SelectMenuesRow';
import { DeleteMenuRow } from '../utils/supabase/DeleteMenuRow';
import { ActiveMenu } from '../utils/supabase/ActiveMenu';

export const ShowMenu = ({ openEditModal, categoryId }) => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false)
    const [menuDelete, setMenuDelete] = useState([])

    const deleteMenu = () => {
        DeleteMenuRow(menuDelete[0])
        setLoading(true)
        setMenuDelete([])
    }

    const deleteConfirm = (menuId, menuName) => {
        setMenuDelete([menuId, menuName])
        setModal(true)
    }

    const editMenu = (MenuId) => {
        openEditModal(MenuId)
    }

    const OnView = (e) => {
        let key = e.target.name
        let checked = (e.target.checked)
        ActiveMenu({ key, checked })
        setLoading(true)
    }


    useEffect(() => {
        const fetchMenu = async () => {
            const menues = await SelectMenuesRow({ categoryId })
            setMenu(menues)
            setLoading(false)
        }
        fetchMenu();
    }, [loading])

    if (loading && menu === null) {
        return <p>Loading......</p>;
    }
    if (menu.length === 0 && !loading) {
        return (
            <div className='flex flex-col'>
                <h2>Nada para mostrar</h2>
            </div>
        )
    }
    return (
        <div className='flex flex-col w-full'>
            {modal && (
                <div className="modal-overlay" onClick={() => setModal(false)}>
                    <div className='modal flex flex-col'>
                        <div className='foreground-dark text-center mb-4'>
                            <p> Deseas eliminar {menuDelete[1]}?</p>
                        </div>
                        <div>
                            <button type="submit" className='btn-sky px-4 rounded-lg mx-2 p-2' onClick={deleteMenu}>Aceptar</button>
                            <button type="button" className='btn-zinc px-4 rounded-lg mx-2 p-2' onClick={() => setModal(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
            {menu.map((menus) => (
                <div className='flex flex-col bg-stone-800 py-4 px-4 rounded-xl mb-4 shadow-2xl'>
                    <div className='flex flex-row'>
                        <div className='md:w-44 w-32 md:h-44 h-32 overflow-hidden mr-4'>
                            <img className='rounded-lg w-full h-full object-cover' src={menus.image} />
                        </div>
                        <div className='flex-1 flex-col text-start'>
                            <p className='md:text-2xl text-xl mb-1 '>{menus.name}</p>
                            <p className='text-xs mb-1 h-12'>{menus.description}</p>
                        </div>
                    </div>
                    <div className='text-start mt-4'>
                        <p className='md:text-2xl text-xl mb-1'>Precio ${menus.price}</p>
                        <p className='text-2xs mb-1'>Alergenos:</p>
                        <div className='flex flex-row'>
                            {menus.alergens.map((alerg) =>
                                <p className='label-emerald text-xs line-clamp-1 md:line-clamp-none rounded-sm px-1 mr-2 mb-2'>{alerg}</p>
                            )}
                        </div>

                    </div>

                    <div className='flex mx-auto mt-4'>
                        <button key={menus.id} className='button-red rounded-lg ml-10 w-24 h-10 mr-2' onClick={() => deleteConfirm(menus.id, menus.name)}>Eliminar</button>
                        <button key={menus.id + 'edit'} className='button-sky rounded-lg ml-2 w-24 h-10 mr-2' onClick={() => editMenu(menus.id)}>Editar</button>
                        <input name={menus.id} type="checkbox" checked={menus.checked} onChange={(e) => OnView(e)} />
                        <p className='ml-2 mt-2'>Visible</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
