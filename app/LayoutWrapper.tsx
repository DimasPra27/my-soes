"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [bgClass, setBgClass] = useState("bg-home");

  useEffect(() => {
    if (pathname === "/" || pathname === "") {
      setBgClass("bg-home");
    } else if (pathname.includes("/form")) {
      setBgClass("bg-form");
    } else if (pathname.includes("/questions")) {
      setBgClass("bg-questions");
    } else if (pathname.includes("/review")) {
      setBgClass("bg-review");
    } else if (pathname.includes("/personality")) {
      setBgClass("bg-personality");
    }
  }, [pathname]);

  useEffect(() => {
    document.body.className =
      document.body.className
        .replace(/bg-form|bg-questions|bg-review|bg-personality|bg-home/g, "")
        .trim() + ` ${bgClass}`;
  }, [bgClass]);

  return children;
}
