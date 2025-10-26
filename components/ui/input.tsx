import React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-emerald-700 bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };

// export function Input({ type = "text", className = "", ...props }) {
//   return (
//     <input
//       type={type}
//       className={cn(
//         "bg-emerald-900/50 border border-emerald-700 text-emerald-50 placeholder-emerald-300 text-sm rounded-lg focus:ring-emerald-400 focus:border-emerald-400 block w-full p-2.5",
//         className
//       )}
//       {...props}
//     />
//   );
// }
