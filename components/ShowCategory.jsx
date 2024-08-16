'use client'

import { useState, useEffect } from 'react';
import { SelectCategoryTable } from '../utils/supabase/SelectCategoryTable';
import { DeleteCategoryTable } from '../utils/supabase/DeleteCategoryTable';
import { useRouter } from "next/navigation";

export const ShowCategory = ({ userId }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const deleteCategory = (categoryId) => {
        DeleteCategoryTable(categoryId)
        setLoading(true)
    }

    const editMenu = (id, categoryname) => {
        router.push(`/main/${id}/${categoryname}`)
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const categor = await SelectCategoryTable({ userId })
            setCategories(categor)
            setLoading(false)
        }
        fetchCategories();
    }, [loading])

    if (loading) {
        return <p>Loading......</p>;
    }

    return (
        <div className='flex flex-col'>
            {categories.map((category) => (
                <div className='flex flex-row mt-10'>
                    <button className='button-purple rounded-lg w-48 sm:w-96 p-4'
                        onClick={() => editMenu(category.id, category.name)}>
                        {category.name}
                    </button>
                    <button key={category.id}
                        className='button-red rounded-lg ml-10 w-32 sm:w-40'
                        onClick={() => deleteCategory(category.id)}>
                        Eliminar
                    </button>
                </div>
            ))}
        </div>
    );
};

