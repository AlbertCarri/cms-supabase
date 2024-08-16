'use server'

import { createClient } from "./server"

export const SelectMenuesRow = async ({ categoryId }) => {
    const supabase = createClient()

    const { data: menu, error } = await supabase
        .from('menu')
        .select('id,name,image,description,price,alergens,checked')
        .eq('category_id', categoryId)
        .order('id', { ascending: true })

    if (error) console.error('Error de Consulta:', error)
    return menu
}