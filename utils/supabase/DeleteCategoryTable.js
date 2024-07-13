'use server'

import { createClient } from "./server"

export const DeleteCategoryTable = async ( categoryId ) => {
    const supabase = createClient()

    const { data: category, error } = await supabase.from('category').delete().eq('id', categoryId)
    console.log('Deleted:',categoryId)
    if (error) console.error('Error de Consulta:', error)

}