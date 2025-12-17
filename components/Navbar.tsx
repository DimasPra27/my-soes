"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };

  // Helper function for smooth scrolling
  const scrollToFooter = () => {
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        const footer = document.getElementById("footer");
        if (footer) {
          footer.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    });
  };

  // Function to handle contact link click
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);

    if (pathname !== "/") {
      // Set flag untuk scroll setelah navigasi
      sessionStorage.setItem("scrollToFooter", "true");
      router.push("/", { scroll: false });
    } else {
      scrollToFooter();
    }
  };

  const navItems = [
    { href: "/", label: "Tentang kami" },
    { href: "/form", label: "Ikuti kuis" },
    { href: "/#footer", label: "Kontak", onClick: handleContactClick },
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

  // Handle scroll after navigation to home
  useEffect(() => {
    if (pathname === "/") {
      const shouldScrollToFooter = sessionStorage.getItem("scrollToFooter");

      if (shouldScrollToFooter === "true") {
        sessionStorage.removeItem("scrollToFooter");
        scrollToFooter();
      }
    }
  }, [pathname]);

  return (
    <>
      <nav className="w-full flex items-center justify-between lg:bg-gradient-to-r lg:from-emerald-600 lg:to-emerald-700 lg:px-12 lg:py-5 lg:shadow-lg rounded-3xl">
        <Link
          href="/"
          className="hidden lg:block font-bold text-white text-3xl hover:opacity-80 transition"
        >
          podjok soes
        </Link>

        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={item.onClick}
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
              onClick={(e) => {
                if (item.onClick) {
                  item.onClick(e);
                } else {
                  setIsOpen(false);
                }
              }}
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
