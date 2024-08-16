'use server'

import { createClient } from "./server"

export const DeleteMenuRow = async ( menuId ) => {
    const supabase = createClient()

    const { data: category, error } = await supabase.from('menu').delete().eq('id', menuId)
    if (error) console.error('Error de Consulta:', error)

}