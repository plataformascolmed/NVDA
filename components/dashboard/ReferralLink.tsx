"use client";

import { useState, useEffect } from "react";
import { Share2, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

interface ReferralLinkProps {
  referralCode: string;
}

export function ReferralLink({ referralCode }: ReferralLinkProps) {
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const shareUrl = `${origin}/auth/register?ref=${referralCode}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Enlace copiado al portapapeles", {
        style: {
          background: "#111118",
          color: "#fff",
          border: "1px solid #76b900/20",
        },
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("No se pudo copiar el enlace");
    }
  };

  const shareWhatsApp = () => {
    const text = `🚀 Únete a NVDA Capital Partners y empieza a generar dividendos diarios conmigo. Regístrate aquí: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareTelegram = () => {
    const text = `🚀 Únete a NVDA Capital Partners y empieza a generar dividendos diarios conmigo.`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="bg-[#111118]/80 backdrop-blur-xl border border-[#1e1e2e] rounded-[40px] p-10 space-y-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#76b900]/5 blur-3xl rounded-full" />
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Share2 className="h-5 w-5 text-[#76b900]" /> Comparte tu enlace
      </h3>
      <p className="text-sm text-gray-400 font-medium leading-relaxed">
        Invita a otros a unirse a NVDA Capital. Al realizar su primera inversión, recibirás un bono del 10% del monto invertido.
      </p>
      
      <div className="p-5 bg-[#0a0a0f] border border-[#1e1e2e] rounded-2xl flex items-center justify-between group/copy">
        <span className="text-[10px] font-mono text-gray-500 truncate mr-4">{shareUrl || "Cargando enlace..."}</span>
        <button 
          onClick={copyToClipboard}
          className="flex items-center gap-2 text-[10px] font-black text-[#76b900] bg-[#76b900]/10 px-4 py-2 rounded-xl hover:bg-[#76b900]/20 transition-all shrink-0 uppercase tracking-widest border border-[#76b900]/10"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={shareWhatsApp}
          className="flex items-center justify-center gap-2 px-4 py-4 bg-[#25D366]/5 text-[#25D366] rounded-2xl font-bold text-[10px] hover:bg-[#25D366]/10 transition-all border border-[#25D366]/10 uppercase tracking-widest"
        >
          WhatsApp
        </button>
        <button 
          onClick={shareTelegram}
          className="flex items-center justify-center gap-2 px-4 py-4 bg-[#0088cc]/5 text-[#0088cc] rounded-2xl font-bold text-[10px] hover:bg-[#0088cc]/10 transition-all border border-[#0088cc]/10 uppercase tracking-widest"
        >
          Telegram
        </button>
      </div>
    </div>
  );
}
