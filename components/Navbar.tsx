"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Rocket, LogIn } from "lucide-react";
import { Button } from "./ui/Button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Cómo funciona", href: "/#how" },
    { label: "Planes", href: "/#plans" },
    { label: "Nosotros", href: "/about" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-nvda-bg/80 backdrop-blur-xl border-b border-nvda-border pt-3 pb-3"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-nvda-green rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(118,185,0,0.4)]">
            <Rocket size={22} className="text-black" />
          </div>
          <div className="flex flex-col">
            <span className="font-space font-bold text-xl leading-none text-white tracking-tight">
              NVDA <span className="text-nvda-green">CAPITAL</span>
            </span>
            <span className="text-[10px] text-nvda-muted font-bold tracking-[0.2em] uppercase leading-none mt-1">
              Partners
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-nvda-green",
                pathname === link.href ? "text-nvda-green" : "text-nvda-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 pl-4 border-l border-nvda-border">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="font-bold">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="font-bold">
                Crear cuenta
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-nvda-bg/95 backdrop-blur-2xl z-40 p-6 flex flex-col gap-6 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-2xl font-space font-bold text-white hover:text-nvda-green"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-nvda-border" />
          <div className="flex flex-col gap-4">
            <Link href="/auth/login" className="w-full">
              <Button variant="outline" className="w-full py-4 text-lg">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/auth/register" className="w-full">
              <Button className="w-full py-4 text-lg">Crear una cuenta</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
