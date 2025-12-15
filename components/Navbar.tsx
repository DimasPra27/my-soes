"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  const navItems = [
    { href: "/", label: "Tentang kami" },
    { href: "/questions", label: "Ikuti kuis" },
    { href: "/form", label: "Kontak" },
    // { href: "/review", label: "Review" },
  ];

  // Auto close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <>
      <nav className="w-full flex items-center justify-between lg:bg-gradient-to-r lg:from-emerald-600 lg:to-emerald-700 lg:px-12 lg:py-5 lg:shadow-lg rounded-3xl">
        {/* Logo */}
        <Link
          href="/"
          className="hidden lg:block font-bold text-white text-3xl hover:opacity-80 transition"
        >
          podjok SOES
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-semibold text-2xl transition ${
                isActive(item.href) && pathname === item.href
                  ? "text-white"
                  : "text-white hover:opacity-80"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-12 h-12 rounded-full bg-[#3D8B4E] flex items-center justify-center text-white hover:opacity-80 transition-all duration-300"
        >
          <div className="relative w-6 h-6">
            <Menu
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                isOpen
                  ? "rotate-90 opacity-0 scale-0"
                  : "rotate-0 opacity-100 scale-100"
              }`}
            />
            <X
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                isOpen
                  ? "rotate-0 opacity-100 scale-100"
                  : "-rotate-90 opacity-0 scale-0"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Bubble Menu */}
      <div
        className={`lg:hidden fixed top-6 left-20 z-50 transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-3">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all text-center shadow-lg ${
                isActive(item.href) && pathname === item.href
                  ? "bg-[#3D8B4E] text-white"
                  : "bg-white text-[#3D8B4E] hover:bg-opacity-90"
              }`}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                transform: isOpen ? "scale(1)" : "scale(0.8)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
