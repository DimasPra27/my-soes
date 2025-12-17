"use client";
import { useState, useEffect } from "react";

type Option = {
  value: number;
  label: string;
  img: string;
  backgroundColor?: string;
  textColor?: string;
};

type CustomSelectProps = {
  value?: number | null;
  onChange?: (value: number) => void;
};

export function CustomSelect({ value = null, onChange }: CustomSelectProps) {
  const [selected, setSelected] = useState<number | null>(value);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  // Sync currentIndex with selected value
  useEffect(() => {
    if (value !== null && value !== undefined && value !== 0) {
      const index = options.findIndex((opt) => opt.value === value);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    } else {
      // Reset to first card if no value
      setCurrentIndex(0);
    }
  }, [value]);

  // Auto-select first card on mount if no value provided
  useEffect(() => {
    if (
      (value === null || value === undefined || value === 0) &&
      currentIndex === 0
    ) {
      handleSelect(options[0].value);
    }
  }, []);

  const options: Option[] = [
    {
      value: 1,
      label: "Bukan Aku Banget",
      img: "answers/1.png",
      backgroundColor: "#CB2E5C",
      textColor: "#FFFFFF",
    },
    {
      value: 2,
      label: "Nggak terlalu aku sih",
      img: "answers/2.png",
      backgroundColor: "#F2BC65",
      textColor: "#0C7A3F",
    },
    {
      value: 3,
      label: "Kadang iya, kadang nggak",
      img: "answers/3.png",
      backgroundColor: "#F2DD5F",
      textColor: "#0C7A3F",
    },
    {
      value: 4,
      label: "Yup, ini aku!",
      img: "answers/4.png",
      backgroundColor: "#4FB665",
      textColor: "#FFC4E5",
    },
    {
      value: 5,
      label: "Aku Banget!",
      img: "answers/5.png",
      backgroundColor: "#3D8B4E",
      textColor: "#FFC4E5",
    },
  ];

  const handleSelect = (val: number) => {
    setSelected(val);
    onChange?.(val);
  };

  const nextCard = () => {
    if (currentIndex < options.length - 1) {
      setCurrentIndex(currentIndex + 1);
      handleSelect(options[currentIndex + 1].value);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      handleSelect(options[currentIndex - 1].value);
    }
  };

  return (
    <div className="relative w-full mx-auto">
      {/* Desktop View - Hidden on mobile */}
      <div className="hidden lg:block w-full">
        <div className="w-full space-y-16">
          {/* Answer Grid - 5 items in single row */}
          <div className="flex justify-center items-flex-start gap-6 w-full px-4">
            {options.map((opt) => (
              <div key={opt.value} className="flex flex-col items-center">
                {/* Card Button */}
                <button
                  onClick={() => {
                    setCurrentIndex(
                      options.findIndex((o) => o.value === opt.value)
                    );
                    handleSelect(opt.value);
                  }}
                  className={`
                    relative rounded-3xl overflow-hidden
                    border-4 shadow-xl transition-all
                    flex flex-col items-center justify-center p-4
                    ${
                      selected === opt.value
                        ? "border-emerald-400 ring-4 ring-emerald-400/50 scale-105"
                        : "border-emerald-700/60 hover:border-emerald-600/80 hover:scale-102"
                    }
                  `}
                  style={{
                    backgroundColor: opt.backgroundColor,
                    width: "250px",
                    height: "350px",
                  }}
                >
                  {/* Label at Top */}
                  <div
                    className="text-center lg:text-xl text-sm font-semibold mb-2 w-full"
                    style={{ color: opt.textColor }}
                  >
                    {opt.label}
                  </div>

                  {/* Image */}
                  <img
                    src={opt.img}
                    alt={opt.label}
                    className="w-4/5 h-4/5 object-contain pointer-events-none"
                    draggable="false"
                  />

                  {/* Checkmark */}
                  <div className="absolute inset-0 flex items-end justify-center p-3 pointer-events-none">
                    {selected === opt.value && (
                      <div className="bg-emerald-500 rounded-full w-8 h-8 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>

          {/* Next Button - Bottom Right */}
          {/* <div className="flex justify-end px-4">
            {selected === null || selected === undefined ? (
              <button
                disabled
                className="px-8 py-3 bg-gray-500/50 text-gray-400 cursor-not-allowed font-bold rounded-lg shadow-md"
              >
                Selanjutnya
              </button>
            ) : (
              <button
                onClick={() => {
                  // Handle next logic here
                }}
                className="px-8 py-3 bg-[#3D8B4E] hover:bg-[#2d6939] text-white font-bold rounded-lg shadow-md transition-all"
              >
                Selanjutnya
              </button>
            )}
          </div> */}
        </div>
      </div>

      {/* Mobile View - Hidden on desktop */}
      <div className="lg:hidden">
        {/* Prev Button */}
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className={`
            hidden lg:block px-6 py-3 rounded-xl font-semibold transition-all shadow-lg flex-shrink-0
            ${
              currentIndex === 0
                ? "bg-gray-600/30 text-gray-500 cursor-not-allowed"
                : "bg-emerald-700/80 text-white hover:bg-emerald-600"
            }
          `}
        >
          ← Geser
        </button>

        {/* Card Stack Container */}
        <div className="relative h-[500px] w-full max-w-md flex items-center justify-center">
          {options.map((opt, index) => {
            const offset = index - currentIndex;
            const isActive = index === currentIndex;

            return (
              <div
                key={opt.value}
                className={`
                  absolute w-full transition-all duration-300 ease-out
                  ${isActive ? "z-30" : offset > 0 ? "z-20" : "z-10"}
                `}
                style={{
                  transform: `
                    translateY(${Math.abs(offset) * 10}px)
                    scale(${isActive ? 1 : 1 - Math.abs(offset) * 0.05})
                    rotate(${offset * 2}deg)
                  `,
                  opacity:
                    Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <button
                  type="button"
                  className={`
                    relative w-full h-[450px] rounded-3xl overflow-hidden
                    border-4 shadow-2xl
                    transition-all cursor-pointer
                    ${
                      selected === opt.value
                        ? "border-emerald-400 ring-4 ring-emerald-400/50"
                        : "border-emerald-700/60 hover:border-emerald-600/80"
                    }
                  `}
                  style={{
                    backgroundColor: opt.backgroundColor,
                  }}
                >
                  {/* Background Image */}
                  <img
                    src={opt.img}
                    alt={opt.label}
                    className="w-2/3 h-2/3 object-contain pointer-events-none mx-auto"
                    draggable="false"
                  />

                  {/* Overlay Gradient */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" /> */}

                  {/* Label at Top */}
                  <div className="absolute top-0 left-0 right-0 p-6 pointer-events-none">
                    <h3
                      className="text-2xl font-bold drop-shadow-lg"
                      style={{ color: opt.textColor }}
                    >
                      {opt.label}
                    </h3>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                    {selected === opt.value && (
                      <div className="mt-2 inline-block px-3 py-1 bg-emerald-500 rounded-full text-white text-sm font-semibold">
                        ✓ Terpilih
                      </div>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={nextCard}
          disabled={currentIndex === options.length - 1}
          className={`
            hidden lg:block px-6 py-3 rounded-xl font-semibold transition-all shadow-lg flex-shrink-0
            ${
              currentIndex === options.length - 1
                ? "bg-gray-600/30 text-gray-500 cursor-not-allowed"
                : "bg-emerald-700/80 text-white hover:bg-emerald-600"
            }
          `}
        >
          Geser →
        </button>
      </div>

      {/* Dots Indicator - Mobile Only */}
      <div className="flex lg:hidden justify-center gap-2 mt-8">
        {options.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-3 h-3 rounded-full transition-all
              ${
                index === currentIndex
                  ? "bg-emerald-400 w-10"
                  : "bg-emerald-700/50 hover:bg-emerald-600/70"
              }
            `}
          />
        ))}
      </div>

      {/* Mobile Navigation Buttons - Below Dots */}
      <div className="flex lg:hidden justify-center gap-4 mt-6">
        <button
          onClick={prevCard}
          disabled={currentIndex === 0}
          className={`
            px-6 py-3 rounded-xl font-semibold transition-all shadow-lg
            ${
              currentIndex === 0
                ? "bg-gray-600/30 text-gray-500 cursor-not-allowed"
                : "bg-emerald-700/80 text-white hover:bg-emerald-600"
            }
          `}
        >
          ← Geser
        </button>

        <button
          onClick={nextCard}
          disabled={currentIndex === options.length - 1}
          className={`
            px-6 py-3 rounded-xl font-semibold transition-all shadow-lg
            ${
              currentIndex === options.length - 1
                ? "bg-gray-600/30 text-gray-500 cursor-not-allowed"
                : "bg-emerald-700/80 text-white hover:bg-emerald-600"
            }
          `}
        >
          Geser →
        </button>
      </div>
    </div>
  );
}
