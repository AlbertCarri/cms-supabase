'use client'

import { InsertIntoMenu } from "../utils/supabase/InsertIntoMenu"
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from "react"
import { SelectEditMenu } from "../utils/supabase/EditMenu"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export const NewMenuModal = ({ closeModal, menuId, categoryId }) => {

    const [menu, setMenu] = useState([])
    const [imagePreview, setImagePreview] = useState('/LogoMenu.jpg')
    const [checkBox, setCheckedBox] = useState({
        gluten: false,
        crustaceos: false,
        huevo: false,
        pescado: false,
        leche: false,
        soja: false,
        mani: false,
        frutossecos: false
    })

    useEffect(() => {
        const ReadMenus = async () => {
            const menus = await SelectEditMenu({ menuId })
            setMenu(menus)
            setCheckedBox({
                ...checkBox, gluten: menus[0].alergens.includes('gluten'),
                crustaceos: menus[0].alergens.includes('crustaceos')
                , huevo: menus[0].alergens.includes('huevo')
                , pescado: menus[0].alergens.includes('pescado')
                , leche: menus[0].alergens.includes('leche')
                , soja: menus[0].alergens.includes('soja')
                , mani: menus[0].alergens.includes('mani')
                , frutossecos: menus[0].alergens.includes('frutossecos')
            })
        }
        if (menuId !== 0) {
            ReadMenus({ menuId })
            menuId = 0
        }
    }, [menuId])

    const CloseModal = () => {
        setImagePreview('/LogoMenu.jpg')
        closeModal()
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        const datas = new FormData(event.target);
        if (imagePreview === '/LogoMenu.jpg') {
            const fileURL = menu[0].image
            const dataObject = Object.fromEntries(datas.entries());
            const formDataObject = { ...dataObject }
            delete formDataObject.file
            InsertIntoMenu({ fileURL, formDataObject, categoryId, menu })
            closeModal()
        } else {
            const imageFile = datas.get('file')
            const { data: path, error } = await supabase.storage
                .from('cms-Main')
                .upload(`public/${imageFile.name}`, imageFile, {
                    upsert: true,
                })
            const { data: fileURL } = supabase.storage.from("cms-Main").getPublicUrl(path.path)
            if (error) {
                console.error('Error al subir la IMAGEN', path)
            } else {
                console.log('Imagen subida correctamente')
            }
            const dataObject = Object.fromEntries(datas.entries());
            const formDataObject = { ...dataObject }
            delete formDataObject.file
            InsertIntoMenu({ fileURL, formDataObject, categoryId, menu })
            closeModal()
        }


    }
    const ImagePreview = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target.result)
            }
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    }


    return (

        <div className="modal-overlay" onClick={CloseModal}>
            <div className="modal w-96" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col foreground-dark text-start'>
                        <label htmlFor='name' className='mb-2'>Nuevo Menú</label>
                        <input
                            type='text'
                            id='name'
                            name="name"
                            defaultValue={menu && menu.length > 0 ? menu[0].name : ''}
                            className='mb-8 p-2 bg-gray-300 rounded-lg'
                        />

                        <label htmlFor='description' className='mb-2' >Descripción</label>
                        <input
                            type='text'
                            name="description"
                            id='description'
                            defaultValue={menu && menu.length > 0 ? menu[0].description : ''}
                            className='mb-8 p-2 bg-gray-300 rounded-lg'
                        />
                        <img src={menu && menu.length > 0 && imagePreview === '/LogoMenu.jpg' ? menu[0].image : imagePreview} width={100} height={100} alt="imagen" />
                        <input className='mb-8' name='file' type='file' accept='jpg,png,bmp' onChange={ImagePreview} />
                        <label htmlFor='price' className='mb-2'>Precio en $(pesos)</label>
                        <input
                            type='text'
                            name="price"
                            id='price'
                            defaultValue={menu && menu.length > 0 ? menu[0].price : ''}
                            className='mb-8 p-2 bg-gray-300 rounded-lg'
                        />

                        <p className='mb-4'>Alergenos:</p>
                        <div className='flex flex-row text-md justify-between'>
                            <label>
                                <input
                                    name='gluten'
                                    type='checkbox'
                                    checked={checkBox.gluten}
                                    onChange={() => setCheckedBox({ ...checkBox, gluten: !checkBox.gluten })}
                                    className='mb-8 p-2 bg-gray-300 rounded-lg'
                                />Gluten</label>
                            <label>
                                <input
                                    name='crustaceos'
                                    type='checkbox'
                                    checked={checkBox.crustaceos}
                                    onChange={() => setCheckedBox({ ...checkBox, crustaceos: !checkBox.crustaceos })}
                                    className='mb-8 p-2 bg-gray-300 rounded-lg'
                                />Crustáceos</label>
                            <label>
                                <input
                                    name="huevo"
                                    type='checkbox'
                                    checked={checkBox.huevo}
                                    onChange={() => setCheckedBox({ ...checkBox, huevo: !checkBox.huevo })}
                                    className='mb-8 p-2 bg-gray-300 rounded-lg'
                                />Huevo</label>
                            <label>
                                <input
                                    type='checkbox'
                                    name='pescado'
                                    checked={checkBox.pescado}
                                    onChange={() => setCheckedBox({ ...checkBox, pescado: !checkBox.pescado })}
                                    className='mb-8 p-2 bg-gray-300 rounded-lg'
                                />Pescado</label>
                        </div>
                        <div className='flex flex-row text-md justify-between'>
                            <label>
                                <input
                                    type='checkbox'
                                    name='leche'
                                    checked={checkBox.leche}
                                    onChange={() => setCheckedBox({ ...checkBox, leche: !checkBox.leche })}
                                    className='mb-8 p-2 bg-gray-300 rounded-lg'
                                />Leche</label>
                            <label>
                                <input
                                    type='checkbox'
                                    name='soja'
                                    checked={checkBox.soja}
                                    onChange={() => setCheckedBox({ ...checkBox, soja: !checkBox.soja })}
                                    className='mb-8 p-2 bg-gray-300 rounded-lg'
                                />Soja</label>
                            <label>
                                <input
                                    type='checkbox'
                                    name='mani'
                                    checked={checkBox.mani}
                                    onChange={() => setCheckedBox({ ...checkBox, mani: !checkBox.mani })}
                                    className='mb-8 p-2 bg-gray-300 rounded-lg'
                                />Maní</label>
                            <label>
                                <input
                                    type='checkbox'
                                    name='frutossecos'
                                    checked={checkBox.frutossecos}
                                    onChange={() => setCheckedBox({ ...checkBox, frutossecos: !checkBox.frutossecos })}
                                    className='mb-8 p-2 bg-gray-300 rounded-lg'
                                />Frutos secos</label>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <button type="submit" className='btn-sky px-6 rounded-lg mx-2 p-2' >Aceptar</button>
                        <button type="button" className='btn-zinc px-6 rounded-lg mx-2 p-2' onClick={CloseModal}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
