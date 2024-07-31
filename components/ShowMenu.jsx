'use client'

import { useState, useEffect } from 'react';
import { SelectMenuesRow } from '../utils/supabase/SelectMenuesRow';
import { DeleteMenuRow } from '../utils/supabase/DeleteMenuRow';

export const ShowMenu = ({ categoryId }) => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    const deleteMenu = (menuId) => {
        DeleteMenuRow(menuId)
        setLoading(true)
    }



    useEffect(() => {
        const fetchMenu = async () => {
            const menues = await SelectMenuesRow({ categoryId })
            setMenu(menues)
            setLoading(false)
            console.log('FetchMenu', menues, 'CategoryId', categoryId)
        }
        fetchMenu();
    }, [loading])

    if (loading) {
        return <p>Loading......</p>;
    }
    if (menu.length === 0) {
        return (
            <div className='flex flex-col'>
                <h2>Nada para mostrar</h2>
            </div>
        )
    }
    return (
        <div className='flex flex-col'>
            {menu.map((menus) => (
                <div className='flex flex-row mt-10'>
                    <img className='rounded-lg mr-4 items-center w-40 h-40' src={menus.image} />
                    <div className='flex flex-col text-start'>
                        <p className='text-2xl mb-2'>{menus.name}</p>
                        <p className='text-xs mb-2 h-8'>{menus.description}</p>
                        <p className='text-2xl mb-2'>${menus.price}</p>
                        <div className='flex flex-row'>
                            {menus.alergens.map((alerg) =>
                                <p className='label-emerald rounded-sm px-1 mr-2'>{alerg}</p>
                            )}
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <button key={menu.id} className='button-red rounded-lg ml-10 w-40 h-8 mr-4' onClick={() => deleteMenu(menu.id)}>Eliminar</button>
                        <input type="checkbox" value={'Visible'} />
                        <p>Visible</p>
                    </div>
                </div>
            ))}
        </div>
    );
};