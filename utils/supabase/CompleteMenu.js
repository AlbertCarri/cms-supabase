'use server'

import { createClient } from "./server"

export const CompleteMenu = async ({ user_uid }) => {
    const supabase = createClient()

    const { data: menu, error } = await supabase
        .from('users')
        .select(`
      *,
      category (
        *,
        menu (*)
      )
    `)
        .eq('user_uid', user_uid);


    if (error) console.error('Error de Consulta:', error)
    return menu[0]
}