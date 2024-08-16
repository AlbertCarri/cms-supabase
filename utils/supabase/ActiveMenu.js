'use server'

import { createClient } from "./server"

export const ActiveMenu = async ({ key, checked }) => {
    const supabase = createClient()

    const { data: menu, error } = await supabase.from('menu').update({ checked: checked }).eq('id', key)
    if (error) console.error('Error de Consulta:', error)

}