'use server'

import { createClient } from "../utils/supabase/server"

export const RestoName = async ({ userId }) => {
    const supabase = createClient()
    console.log('RestoName :', userId)

    const { data: users, error } = await supabase.from('users').select('resto_name').eq('user_uid', userId)
    //console.log('Resaurants:', users[0].resto_name, error)

    if (error) console.error('Error de Consulta:', error)

    if (users.length <= 0) {
        const { data: users, error } = await supabase.from('users').insert([{ 'resto_name': 'Nada Cargado', 'user_uid': userId }])
        if (error) {
            console.error('Error de Consulta:', error)
            return
        }
    }
    const resto = users[0].resto_name
    console.log('RestoName :', users)
    return (
        <>
            <h2 className="background-window w-48 sm:w-56 p-2 mr-10 rounded-lg">{resto}</h2>
        </>
    )
}