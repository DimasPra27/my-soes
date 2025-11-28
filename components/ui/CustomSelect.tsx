"use client";
import { useState, useEffect } from "react";

type Option = {
  value: number;
  label: string;
  img: string;
};

type CustomSelectProps = {
  value?: number | null;
  onChange?: (value: number) => void;
};

export function CustomSelect({ value = null, onChange }: CustomSelectProps) {
  const [selected, setSelected] = useState<number | null>(value);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  // Sync currentIndex with selected value
  useEffect(() => {
    if (value !== null && value !== undefined) {
      const index = options.findIndex((opt) => opt.value === value);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    } else {
      // Reset to first card if no value
      setCurrentIndex(0);
    }
  }, [value]);

  const options: Option[] = [
    { value: 1, label: "Bukan Aku Banget", img: "answers/1.png" },
    { value: 2, label: "Nggak terlalu aku sih", img: "answers/2.png" },
    { value: 3, label: "Kadang iya, kadang nggak", img: "answers/3.png" },
    { value: 4, label: "Yup, ini aku!", img: "answers/4.png" },
    { value: 5, label: "Aku Banget!", img: "answers/5.png" },
  ];

  const handleSelect = (val: number) => {
    setSelected(val);
    onChange?.(val);
  };

  const nextCard = () => {
    if (currentIndex < options.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - dragStart;
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0) {
        prevCard();
      } else {
        nextCard();
      }
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const offset = e.touches[0].clientX - dragStart;
    setDragOffset(offset);
  };

  const handleTouchEnd = () => {
    if (Math.abs(dragOffset) > 100) {
      if (dragOffset > 0) {
        prevCard();
      } else {
        nextCard();
      }
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Card Stack Container */}
      <div className="relative h-[500px] flex items-center justify-center">
        {options.map((opt, index) => {
          const offset = index - currentIndex;
          const isActive = index === currentIndex;

          return (
            <div
              key={opt.value}
              className={`
                absolute w-full transition-all duration-300 ease-out
                ${isActive ? "z-30" : offset > 0 ? "z-20" : "z-10"}
                ${isDragging && isActive ? "transition-none" : ""}
              `}
              style={{
                transform: `
                  translateX(${isActive ? dragOffset : offset * 20}px)
                  translateY(${Math.abs(offset) * 10}px)
                  scale(${isActive ? 1 : 1 - Math.abs(offset) * 0.05})
                  rotate(${isActive ? dragOffset * 0.05 : offset * 2}deg)
                `,
                opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2,
                pointerEvents: isActive ? "auto" : "none",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => {
                if (isDragging) handleMouseUp();
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <button
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`
                  relative w-full h-[450px] rounded-3xl overflow-hidden
                  border-4 shadow-2xl bg-green-900
                  transition-all cursor-grab active:cursor-grabbing
                  ${
                    selected === opt.value
                      ? "border-emerald-400 ring-4 ring-emerald-400/50"
                      : "border-emerald-700/60 hover:border-emerald-600/80"
                  }
                `}
              >
                {/* Background Image */}
                <img
                  src={opt.img}
                  alt={opt.label}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable="false"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Label at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                  <h3 className="text-white text-2xl font-bold drop-shadow-lg">
                    {opt.label}
                  </h3>
                  {selected === opt.value && (
                    <div className="mt-2 inline-block px-3 py-1 bg-emerald-500 rounded-full text-white text-sm font-semibold">
                      ✓ Selected
                    </div>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-between items-center mt-8">
        {/* <button
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
          ← Prev
        </button> */}

        {/* <div className="text-emerald-100 font-bold text-lg">
          {currentIndex + 1} / {options.length}
        </div> */}

        {/* <button
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
          Next →
        </button> */}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-2">
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
    </div>
  );
}
