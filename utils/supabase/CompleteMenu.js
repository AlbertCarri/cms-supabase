'use server'

import { createClient } from "./server"

export const CompleteMenu = async ({ resto_name }) => {
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
    .eq('resto_name', resto_name);


  if (error) console.error('Error de Consulta:', error)
  return menu[0]
}