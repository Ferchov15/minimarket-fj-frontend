"use client";
import { useState, useEffect } from "react";

interface CategoryBarProps {
  categorias: string[];
  categoriaActiva?: string;
  onSelect?: (categoria: string) => void;
}

export default function CategoryBar({
  categorias,
  categoriaActiva = "todas",
  onSelect,
}: CategoryBarProps) {
  const [limiteVisible, setLimiteVisible] = useState(4);
  const [start, setStart] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setLimiteVisible(1);    
      else if (width < 768) setLimiteVisible(2); 
      else if (width < 1024) setLimiteVisible(3); 
      else setLimiteVisible(4);                 
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = (cat: string) => {
    if (typeof onSelect === "function") onSelect(cat);
  };

  const maxIndex = Math.max(categorias.length - limiteVisible, 0);
  const visibles = categorias.slice(start, start + limiteVisible);

  return (
    <div className="bg-[#b36a5e] flex items-center justify-center gap-1 sm:gap-2 px-3 py-4 rounded-b-[40px] mb-6 shadow-md">
      
      {categorias.length > limiteVisible && (
        <button
          onClick={() => setStart((p) => Math.max(p - 1, 0))}
          className="bg-white/20 hover:bg-white/40 text-white rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0 transition-transform active:scale-90"
        >
          ‹
        </button>
      )}

      <div className="flex items-center shrink-0">
        <button
          onClick={() => handleSelect("todas")}
          className={`px-3 py-2 font-bold whitespace-nowrap transition-all text-sm sm:text-[1.1rem] border-b-[3px] shrink-0 ${
            categoriaActiva === "todas" 
              ? "border-[#4fc3f7] text-white" 
              : "border-transparent text-white/70 hover:text-white"
          }`}
        >
          Todas
        </button>
      </div>

      <div className="flex items-center overflow-hidden transition-all">
        {visibles.map((cat) => (
          <div key={cat} className="flex items-center shrink-0">
            <div className="w-[1px] h-5 bg-white/30 mx-1 sm:mx-2" />
            
            <button
              onClick={() => handleSelect(cat)}
              className={`px-3 py-2 font-bold whitespace-nowrap transition-all text-sm sm:text-[1.1rem] capitalize border-b-[3px] shrink-0 ${
                categoriaActiva === cat 
                  ? "border-[#4fc3f7] text-white" 
                  : "border-transparent text-white/70 hover:text-white"
              }`}
            >
              {cat}
            </button>
          </div>
        ))}
      </div>

      {categorias.length > limiteVisible && (
        <button
          onClick={() => setStart((p) => Math.min(p + 1, maxIndex))}
          className="bg-white/20 hover:bg-white/40 text-white rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0 transition-transform active:scale-90"
        >
          ›
        </button>
      )}
    </div>
  );
}