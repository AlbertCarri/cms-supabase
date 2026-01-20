"use client";

import { saveAs } from "file-saver";
import Link from "next/link";

export const ShowQr = ({ urlQr }) => {
  const handleDownload = () => {
    saveAs(
      "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + urlQr,
      "codigo.png",
    );
  };

  return (
    <div className="bg-slate-800">
      <Link className="w-11/12 btn-zinc mx-auto mb-4 block" href={"/onboarding/step-1"}>
        Modificar tu perfil
      </Link>
      <p className="text-xl text-center mb-4">Tu código QR:</p>
      <button onClick={handleDownload}>
        <img
          src={
            "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
            urlQr
          }
          width={300}
          height={300}
        />
      </button>
      <p className="text-sm mt-4 text-center">
        Click sobre la imagen para descargar:
      </p>
    </div>
  );
};
