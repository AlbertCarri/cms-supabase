'use client'

import { useState, useEffect } from 'react';
import { SelectMenuesRow } from '../utils/supabase/SelectMenuesRow';
import { DeleteMenuRow } from '../utils/supabase/DeleteMenuRow';
import { ActiveMenu } from '../utils/supabase/ActiveMenu';

export const ShowMenu = ({ openEditModal, categoryId }) => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    const deleteMenu = (menuId) => {
        DeleteMenuRow(menuId)
        setLoading(true)
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
            {menu.map((menus) => (
                <div className='flex flex-col md:flex-row bg-stone-800 py-4 px-4 rounded-xl mb-4 shadow-2xl'>
                    <img className='rounded-lg mr-4 items-center w-44 h-44' src={menus.image} />
                    <div className='flex-1 flex-col text-start'>
                        <p className='text-2xl mb-2'>{menus.name}</p>
                        <p className='text-xs mb-2 h-8'>{menus.description}</p>
                        <p className='text-2xl mb-2'>Precio ${menus.price}</p>
                        <p className='text-2xs mb-2'>Alergenos</p>
                        <div className='flex flex-row'>
                            {menus.alergens.map((alerg) =>
                                <p className='label-emerald text-xs line-clamp-1 md:line-clamp-none rounded-sm px-1 mr-2 mb-2'>{alerg}</p>
                            )}
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <button key={menus.id} className='button-red rounded-lg ml-10 w-24 h-10 mr-4' onClick={() => deleteMenu(menus.id)}>Eliminar</button>
                        <button key={menus.id + 'edit'} className='button-sky rounded-lg ml-2 w-24 h-10 mr-4' onClick={() => editMenu(menus.id)}>Editar</button>
                        <input name={menus.id} type="checkbox" checked={menus.checked} onChange={(e) => OnView(e)} />
                        <p className='ml-2'>Visible</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
