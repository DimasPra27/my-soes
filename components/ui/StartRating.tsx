"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

export default function StarRating({ value, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex gap-2 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = hovered ? star <= hovered : star <= value;

        return (
          <motion.div
            key={star}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange(star)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Star
              className={`w-8 h-8 ${
                active ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
              }`}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export { StarRating };
