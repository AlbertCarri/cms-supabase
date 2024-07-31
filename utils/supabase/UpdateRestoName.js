'use server'

import { createClient } from "./server"

export const RestoNameChange = async ({ userId, inputValue }) => {
    const supabase = createClient()


    const { data: users, error } = await supabase.from('users').update({ resto_name: inputValue }).eq('user_uid', userId)

    if (error) console.error('Error de Consulta:', error)

    return
}