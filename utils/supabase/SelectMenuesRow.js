'use server'

import { createClient } from "./server"

export const SelectMenuesRow = async ({ categoryId }) => {
    const supabase = createClient()

    const { data: menu, error } = await supabase.from('menu').select('id,name,image,description,price,alergens').eq('category_id', categoryId)
    console.log('SelectMenuesRow:', categoryId)
    if (error) console.error('Error de Consulta:', error)
    return menu
}