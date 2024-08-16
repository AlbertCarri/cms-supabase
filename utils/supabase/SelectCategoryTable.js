'use server'

import { createClient } from "./server"

export const SelectCategoryTable = async ({ userId }) => {
    const supabase = createClient()

    const { data: category, error } = await supabase.from('category').select('name,id').eq('user_uid', userId)
    if (error) console.error('Error de Consulta:', error)

    return category
}