import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaletteSelect({
  palettes,
  selectedPalette,
  selectPalette,
}) {
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollMove =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - 180
          : scrollContainerRef.current.scrollLeft + 180;

      scrollContainerRef.current.scrollTo({
        left: scrollMove,
        behavior: "smooth",
      });
    }
  };

  const scrollContainerRef = useRef(null);
  return (
    <div className="relative group">
      <button
        type="button"
        onClick={() => scroll("left")}
        className="absolute z-10 bg-slate-500 p-2 rounded-full top-16 left-2 active:scale-90 duration-100"
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        onClick={() => scroll("right")}
        className="absolute z-10 bg-slate-500 p-2 rounded-full top-16 right-2 active:scale-90 duration-100"
      >
        <ChevronRight />
      </button>
      <div
        ref={scrollContainerRef}
        className="flex flex-row w-full gap-2 p-4 overflow-x-auto snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {palettes.map((palette) => {
          return (
            <div
              key={palette.id}
              className={`p-1 rounded-md snap-start scroll-ml-44 active:scale-95 cursor-pointer duration-300
                    ${palette.id === selectedPalette ? "bg-indigo-600 scale-110 shadow-xl" : "bg-gray-900 hover:scale-102 hover:shadow-lg}"}
                    `}
              onClick={() => selectPalette(palette.id)}
            >
              <div className="flex flex-col">
                <div
                  style={{
                    background: `${palette.background}`,
                    color: `${palette.text}`,
                  }}
                  className="w-40 h-20 p-4 rounded-t-md flex items-center justify-center font-semibold text-sm"
                >
                  {palette.name}
                </div>
                <div className="flex flex-row text-xs">
                  <div
                    style={{ background: `${palette.button1}` }}
                    className="w-20 p-4 text-center rounded-bl-md"
                  >
                    Boton1
                  </div>
                  <div
                    style={{ background: `${palette.button2}` }}
                    className="w-20 p-4 text-center rounded-br-md"
                  >
                    Boton2
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
