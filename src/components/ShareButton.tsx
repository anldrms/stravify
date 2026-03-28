"use client";

import { Share2 } from "lucide-react";

export default function ShareButton({ 
  distance, 
  elevation, 
  runs, 
  name 
}: { 
  distance: string, 
  elevation: number, 
  runs: number, 
  name: string 
}) {
  
  const handleShare = () => {
    // Vercel'deki sitenin URL'si
    const baseUrl = "https://stravify-rho.vercel.app";
    const ogUrl = `${baseUrl}/api/og?distance=${distance}&elevation=${elevation}&runs=${runs}&name=${encodeURIComponent(name)}`;
    
    const text = `Son 100 aktivitemde toplam ${distance} KM devirdim ve ${elevation}m tırmandım! 🏃‍♂️🔥 Kendi istatistiklerini oluşturmak için: ${baseUrl}`;
    
    // X (Twitter) paylaşım linkini oluşturuyoruz
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(baseUrl)}`;
    
    window.open(twitterUrl, "_blank");
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 mt-8 px-6 py-3 bg-[#1DA1F2] hover:bg-[#1a91da] text-white rounded-full font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(29,161,242,0.3)]"
    >
      <Share2 className="w-5 h-5" />
      X'te (Twitter) Paylaş
    </button>
  );
}
