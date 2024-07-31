'use server'

import { createClient } from "./server"

export const InsertIntoMenu = async ({fileURL, formDataObject, categoryId}) => {
    const supabase = createClient()

    console.log('Menu Insert:', categoryId)

    const alergens = new Array()
    if (formDataObject.gluten === 'on') alergens.push('gluten')
    if (formDataObject.crustaceos === 'on') alergens.push('crustaceos')
    if (formDataObject.huevo === 'on') alergens.push('huevo')
    if (formDataObject.pescado === 'on') alergens.push('pescado')
    if (formDataObject.leche === 'on') alergens.push('leche')
    if (formDataObject.soja === 'on') alergens.push('soja')
    if (formDataObject.mani === 'on') alergens.push('mani')
    if (formDataObject.frutossecos === 'on') alergens.push('frutossecos')

    const { data: menu, error } = await supabase
        .from('menu')
        .insert([{ category_id: categoryId, name: formDataObject.name, description: formDataObject.description, image: fileURL.publicUrl, price: formDataObject.price, alergens: alergens }])

    console.log('Insert_Menu:', formDataObject)
    if (error) console.error('Error de Consulta:', error)

}