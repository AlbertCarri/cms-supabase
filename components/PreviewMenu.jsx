export default function PreviewMenu({
  palettes,
  selectedPalette,
  bannerImage,
  logoImage,
  restoName,
}) {
  return (
    <div
      className="absolute p-1 top-4 right-4 bg-stone-800 w-80 h-[540px] rounded-lg"
      style={{
        background: `${palettes[selectedPalette - 1].background}`,
        color: `${palettes[selectedPalette - 1].text}`,
      }}
    >
      <img
        src={bannerImage}
        alt="banner del resto"
        className="w-full h-24 object-cover overflow-hidden"
      />
      <img
        src={logoImage}
        alt="logo del negocio"
        className="mx-auto -mt-12 w-24 h-24 "
      />
      <p className="text-2xl text-center">{restoName}</p>
      <p className="text-center text-xs text- ">Mas info</p>
      <div className="flex flex-row mt-4 gap-1 overflow-hidden">
        <p
          style={{
            background: `${palettes[selectedPalette - 1].button1}`,
            color: `${palettes[selectedPalette - 1].text}`,
          }}
          className="p-2 rounded-lg"
        >
          Sandiwchs
        </p>
        <p
          style={{
            background: `${palettes[selectedPalette - 1].button1}`,
            color: `${palettes[selectedPalette - 1].text}`,
          }}
          className="p-2 rounded-lg"
        >
          Pizza
        </p>
        <p
          style={{
            background: `${palettes[selectedPalette - 1].button1}`,
            color: `${palettes[selectedPalette - 1].text}`,
          }}
          className="p-2 rounded-lg"
        >
          Entradas
        </p>
        <p
          style={{
            background: `${palettes[selectedPalette - 1].button1}`,
            color: `${palettes[selectedPalette - 1].text}`,
          }}
          className="p-2 rounded-lg"
        >
          Desayuno
        </p>
      </div>
      <div className="flex flex-row mt-4 gap-1 overflow-hidden">
        <p
          style={{
            background: `${palettes[selectedPalette - 1].button2}`,
            color: `${palettes[selectedPalette - 1].text}`,
          }}
          className="p-2 rounded-lg"
        >
          Completo
        </p>
        <p
          style={{
            background: `${palettes[selectedPalette - 1].button2}`,
            color: `${palettes[selectedPalette - 1].text}`,
          }}
          className="p-2 rounded-lg"
        >
          SinTACC
        </p>
        <p
          style={{
            background: `${palettes[selectedPalette - 1].button2}`,
            color: `${palettes[selectedPalette - 1].text}`,
          }}
          className="p-2 rounded-lg"
        >
          Vegano
        </p>
        <p
          style={{
            background: `${palettes[selectedPalette - 1].button2}`,
            color: `${palettes[selectedPalette - 1].text}`,
          }}
          className="p-2 rounded-lg"
        >
          Vegetariano
        </p>
      </div>
    </div>
  );
}
