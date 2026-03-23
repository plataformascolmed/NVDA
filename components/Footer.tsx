import React from "react";
import Link from "next/link";
import { Twitter, Instagram, Linkedin, Github, Rocket } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nvda-bg pt-20 pb-10 border-t border-nvda-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6 md:col-span-1 border-r border-nvda-border pr-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-nvda-green rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(118,185,0,0.4)] group-hover:scale-105 transition-transform duration-300">
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
            <p className="text-nvda-muted text-sm leading-relaxed max-w-xs italic">
              "NVDA Capital Partners es una plataforma independiente que conecta a inversores con el ecosistema de la Inteligencia Artificial. No estamos afiliados directamente con NVIDIA Corporation."
            </p>
            <div className="flex items-center gap-4 text-nvda-muted">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <Link key={i} href="#" className="hover:text-nvda-green transition-colors">
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="font-space font-bold text-white uppercase tracking-wider text-sm">Empresa</h4>
            <ul className="flex flex-col gap-3 text-nvda-muted text-sm font-medium">
              <li className="hover:text-nvda-green transition-colors cursor-pointer">Nosotros</li>
              <li className="hover:text-nvda-green transition-colors cursor-pointer">Equipo</li>
              <li className="hover:text-nvda-green transition-colors cursor-pointer">Seguridad</li>
              <li className="hover:text-nvda-green transition-colors cursor-pointer">Prensa</li>
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="font-space font-bold text-white uppercase tracking-wider text-sm">Recursos</h4>
            <ul className="flex flex-col gap-3 text-nvda-muted text-sm font-medium">
              <li className="hover:text-nvda-green transition-colors cursor-pointer">Blog</li>
              <li className="hover:text-nvda-green transition-colors cursor-pointer">FAQ</li>
              <li className="hover:text-nvda-green transition-colors cursor-pointer">Centro de ayuda</li>
              <li className="hover:text-nvda-green transition-colors cursor-pointer">Estado del sistema</li>
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="font-space font-bold text-white uppercase tracking-wider text-sm">Legal</h4>
            <ul className="flex flex-col gap-3 text-nvda-muted text-sm font-medium">
              <li className="hover:text-nvda-green transition-colors cursor-pointer">Términos de servicio</li>
              <li className="hover:text-nvda-green transition-colors cursor-pointer">Política de privacidad</li>
              <li className="hover:text-nvda-green transition-colors cursor-pointer">Cookies</li>
              <li className="hover:text-nvda-green transition-colors cursor-pointer">Cumplimiento</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-t border-nvda-border/30">
          <p className="text-nvda-muted text-xs font-semibold uppercase tracking-widest">
            © {currentYear} NVDA Capital Partners S.A.S. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-xs text-nvda-muted font-bold uppercase tracking-widest">
            <span>HECHO CON</span>
            <span className="w-1.5 h-1.5 bg-nvda-green rounded-full animate-pulse shadow-[0_0_5px_#76b900]" />
            <span>PARA COLOMBIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
