'use client'

import { useState, useEffect } from 'react';
import { SelectCategoryTable } from '../utils/supabase/SelectCategoryTable';
import { DeleteCategoryTable } from '../utils/supabase/DeleteCategoryTable';

export const ShowCategory = ({ userId }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const deleteCategory = (categoryId) => {
        DeleteCategoryTable(categoryId)
        setLoading(true)
    }



    useEffect(() => {
        const fetchCategories = async () => {
            const categor = await SelectCategoryTable({ userId })
            setCategories(categor)
            setLoading(false)
            console.log('FetchCategory', categor)
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
                    <button className='button-purple rounded-lg w-96 p-4'>
                        {category.name}
                    </button>
                    <button key={category.id} className='button-red rounded-lg ml-10 w-40' onClick={() => deleteCategory(category.id)}>Eliminar</button>
                </div>
            ))}
        </div>
    );
};

