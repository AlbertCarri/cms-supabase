'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import { ShowMenu } from './ShowMenu';
import { NewMenuModal } from './NewMenuModal';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const NewMenu = ({ categoryId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ShowMe, setShowMe] = useState(true)
    const [menuId, setMenuId] = useState(0)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setMenuId(0)
        setIsModalOpen(false)
        setShowMe(prevShowMe => !prevShowMe)
    }

    const openEditModal = (id) => {
        setMenuId(id)
        setIsModalOpen(true)
    }

    return (
        <div>
            <button className="button-sky px-32 rounded-lg p-4" onClick={openModal}>
                Agregar Menú
            </button>
            {isModalOpen && <NewMenuModal closeModal={closeModal} menuId={menuId} categoryId={categoryId} />}
            <div className="flex flex-row mt-10">
                <ShowMenu key={ShowMe} categoryId={categoryId} openEditModal={openEditModal} />
            </div>
        </div>
    );
};