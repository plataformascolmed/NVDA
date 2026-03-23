import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { TechBackground } from "@/components/ui/TechBackground";
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "NVDA Capital Partners | Inversión Inteligente",
  description: "Plataforma premium de gestión de capital inmobiliario y tecnológico.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased text-white selection:bg-[#76b900]/30 relative">
        <TechBackground />
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
