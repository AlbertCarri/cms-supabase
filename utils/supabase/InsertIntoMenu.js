'use server'

import { createClient } from "./server"

export const InsertIntoMenu = async ({ fileURL, formDataObject, categoryId, menu }) => {
    const supabase = createClient()
    const menues = menu
    console.log('Menu Insert:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::', menu)

    const alergens = new Array()
    if (formDataObject.gluten === 'on') alergens.push('gluten')
    if (formDataObject.crustaceos === 'on') alergens.push('crustaceos')
    if (formDataObject.huevo === 'on') alergens.push('huevo')
    if (formDataObject.pescado === 'on') alergens.push('pescado')
    if (formDataObject.leche === 'on') alergens.push('leche')
    if (formDataObject.soja === 'on') alergens.push('soja')
    if (formDataObject.mani === 'on') alergens.push('mani')
    if (formDataObject.frutossecos === 'on') alergens.push('frutossecos')

    if (menu.length > 0) {
        const { data: menu, error } = await supabase
            .from('menu')
            .update([{ category_id: categoryId, name: formDataObject.name, description: formDataObject.description, image: fileURL.publicUrl, price: formDataObject.price, alergens: alergens }])
            .eq('id', menues[0].id)
        if (error) console.error('Error de Consulta:', error)
    } else {
        const { data: menu, error } = await supabase
            .from('menu')
            .insert([{ category_id: categoryId, name: formDataObject.name, description: formDataObject.description, image: fileURL.publicUrl, price: formDataObject.price, alergens: alergens }])
        if (error) console.error('Error de Consulta:', error)
    }


}