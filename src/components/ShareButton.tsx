"use client";

import { Share2 } from "lucide-react";

export default function ShareButton({ 
  distance, 
  elevation, 
  runs,
  time,
  city,
  name,
  lang,
  buttonText,
  shareText
}: { 
  distance: string, 
  elevation: number, 
  runs: number, 
  time: string,
  city: string,
  name: string,
  lang: string,
  buttonText: string,
  shareText: string
}) {
  
  const handleShare = () => {
    const baseUrl = "https://stravify-rho.vercel.app";
    const ogUrl = `${baseUrl}/api/og?distance=${distance}&elevation=${elevation}&runs=${runs}&time=${time}&city=${encodeURIComponent(city)}&name=${encodeURIComponent(name)}&lang=${lang}`;
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(baseUrl)}`;
    
    window.open(twitterUrl, "_blank");
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 mt-8 px-8 py-4 bg-gradient-to-r from-[#1DA1F2] to-[#1a91da] hover:scale-105 text-white rounded-full font-bold transition-all shadow-[0_0_30px_rgba(29,161,242,0.4)] hover:shadow-[0_0_50px_rgba(29,161,242,0.6)]"
    >
      <Share2 className="w-6 h-6" />
      {buttonText}
    </button>
  );
}
