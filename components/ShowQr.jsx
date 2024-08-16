'use client'

import {saveAs} from "file-saver"

export const ShowQr = ({ urlQr }) => {

    const handleDownload = () => {
        saveAs(urlQr,'codigo.png')
    };

    return (
        <>
            <button onClick={handleDownload}>
                <img src={urlQr} width={300} height={300}/>
            </button>
            <p>Click sobre la imagen para descargar</p>
        </>
    )
}
