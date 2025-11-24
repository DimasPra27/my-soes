"use client";
import { useState, useEffect } from "react";

type Option = {
  value: number;
  label: string;
};

type CustomSelectProps = {
  value?: number | null; // controlled from parent
  onChange?: (value: number) => void;
};

export function CustomSelect({ value = null, onChange }: CustomSelectProps) {
  const [selected, setSelected] = useState<number | null>(value);

  // sync nếu value dari parent berubah
  useEffect(() => {
    setSelected(value);
  }, [value]);

  const options: Option[] = [
    { value: 1, label: "Bukan Aku Banget 😅" },
    { value: 2, label: "Nggak terlalu aku sih 🤔" },
    { value: 3, label: "Kadang iya, kadang nggak 🙂" },
    { value: 4, label: "Yup, ini aku! 😎" },
    { value: 5, label: "Aku Banget! 🐴" },
  ];

  const handleSelect = (val: number) => {
    setSelected(val);
    onChange?.(val);
  };

  return (
    <div className="space-y-4">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => handleSelect(opt.value)}
          className={`
            w-full text-left px-5 py-4 rounded-xl text-emerald-100 text-lg
            border transition-all backdrop-blur-md shadow-md
            ${
              selected === opt.value
                ? "bg-emerald-600/60 border-emerald-400"
                : "bg-emerald-900/40 border-emerald-700/30 hover:bg-emerald-800/40"
            }
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
