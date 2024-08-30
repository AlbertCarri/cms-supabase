'use client'

import { saveAs } from "file-saver"

export const ShowQr = ({ urlQr }) => {

    const handleDownload = () => {
        saveAs('https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + urlQr, 'codigo.png')
    };

    return (
        <>
            <p className="text-xl text-center mb-4">Este es el QR de tu Restó:</p>
            <button onClick={handleDownload}>
                <img src={'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' + urlQr} width={300} height={300} />
            </button>
            <p className="text-sm mt-4 text-center">Click sobre la imagen para descargar:</p>
        </>
    )
}
