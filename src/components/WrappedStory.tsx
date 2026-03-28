"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mountain, Route, Award, Footprints, Clock, MapPin, Heart, Zap, Calendar, Share2, Volume2 } from "lucide-react";
import ShareButton from "./ShareButton";
import { Language } from "@/lib/i18n";

const SLIDE_DURATION = 5000; // Her slayt 5 saniye

export default function WrappedStory({ metrics, dict, lang, name }: { metrics: any, dict: any, lang: Language, name: string }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const slides = [
    {
      id: "intro",
      title: dict.yourWrapped,
      subtitle: dict.subtitle,
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=1200",
      content: (
        <div className="text-center px-6">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-orange-500 to-rose-600 shadow-[0_0_80px_rgba(249,115,22,0.6)] mx-auto mb-10 rotate-12" 
          />
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl md:text-9xl font-black italic uppercase leading-none tracking-tighter"
          >
            STRAVIFY <br/> <span className="text-orange-500">2026</span>
          </motion.h2>
        </div>
      )
    },
    {
      id: "distance",
      title: dict.totalKm,
      image: "https://images.unsplash.com/photo-1502904538981-05970ad9b48b?auto=format&fit=crop&q=80&w=1200",
      content: (
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-orange-500/20 p-6 rounded-full backdrop-blur-md mb-4">
             <Route className="w-16 h-16 text-orange-500" />
          </motion.div>
          <div className="text-zinc-400 font-bold uppercase tracking-widest">{dict.totalKm}</div>
          <motion.div 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="text-[12rem] md:text-[15rem] font-black leading-none tracking-tighter italic text-white"
          >
            {metrics.totalDistanceKm}
          </motion.div>
        </div>
      )
    },
    {
      id: "city",
      title: dict.topCity,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1200",
      content: (
        <div className="text-center space-y-8">
           <motion.div initial={{ y: -50 }} animate={{ y: 0 }} className="inline-block bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-2 rounded-full text-xl font-bold italic mb-4">
             {dict.topCity}
           </motion.div>
           <motion.h3 
              initial={{ scale: 0.8, filter: "blur(10px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              className="text-8xl md:text-[10rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500"
           >
             {metrics.topCity}
           </motion.h3>
           <p className="text-2xl text-orange-400 font-bold italic">Where your heart beats fastest.</p>
        </div>
      )
    },
    {
      id: "behavior",
      title: dict.topDay,
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=1200",
      content: (
        <div className="flex flex-col items-center space-y-12">
          <div className="space-y-2 text-center">
             <div className="text-zinc-500 font-bold uppercase tracking-widest">{dict.topDay}</div>
             <motion.div initial={{ x: -100 }} animate={{ x: 0 }} className="text-9xl font-black italic text-orange-500">{metrics.topDay[lang]}</motion.div>
          </div>
          <motion.div 
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}
             className="bg-black/40 backdrop-blur-2xl border border-white/10 p-10 rounded-[40px] flex items-center gap-8 shadow-2xl"
          >
             <div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center rotate-3">
                <Zap className="w-12 h-12 text-black fill-black" />
             </div>
             <div className="text-left">
                <div className="text-zinc-400 font-bold uppercase text-sm tracking-widest">{dict.topTime}</div>
                <div className="text-4xl font-black text-white italic">{dict[metrics.topTime]}</div>
             </div>
          </motion.div>
        </div>
      )
    },
    {
      id: "social",
      title: dict.socialStatus,
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200",
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-6">
           <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="relative"
           >
              <Heart className="w-40 h-40 text-rose-500 fill-rose-500 drop-shadow-[0_0_40px_rgba(244,63,94,0.6)]" />
              <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-black">
                {metrics.totalKudos}
              </div>
           </motion.div>
           <h3 className="text-4xl font-black uppercase tracking-[0.2em] text-white pt-8">{dict.socialStatus}</h3>
           <p className="text-xl text-zinc-400 font-medium italic">People love what you do.</p>
        </div>
      )
    },
    {
      id: "final",
      title: "Share",
      image: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=1200",
      content: (
        <div className="flex flex-col items-center justify-center w-full max-w-lg px-6">
           <motion.div 
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="bg-zinc-900/90 backdrop-blur-2xl border border-white/10 p-10 rounded-[50px] w-full shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
           >
              <div className="flex justify-between items-start mb-12">
                 <div>
                    <h2 className="text-4xl font-black italic text-orange-500 tracking-tighter">STRAVIFY</h2>
                    <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">Wrapped 2026</p>
                 </div>
                 <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-zinc-500" />
                 </div>
              </div>

              <div className="space-y-10">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <div className="text-4xl font-black text-white">{metrics.totalDistanceKm}</div>
                       <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{dict.totalKm}</div>
                    </div>
                    <div className="space-y-1">
                       <div className="text-4xl font-black text-white">{metrics.totalHours}</div>
                       <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{dict.time}</div>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <div className="text-4xl font-black text-white">{metrics.topCity}</div>
                       <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{dict.topCity}</div>
                    </div>
                    <div className="space-y-1">
                       <div className="text-4xl font-black text-white">{metrics.runCount}</div>
                       <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">{dict.activities}</div>
                    </div>
                 </div>
              </div>

              <div className="mt-14 pt-8 border-t border-white/5">
                <ShareButton 
                    distance={metrics.totalDistanceKm} 
                    elevation={metrics.totalElevationMeters} 
                    runs={metrics.runCount}
                    time={metrics.totalHours}
                    city={metrics.topCity}
                    name={name}
                    lang={lang}
                    buttonText={dict.shareX}
                    shareText={`Just dropped my Stravify Wrapped! 🏃‍♂️🔥 Check yours at stravify-ai.vercel.app #Stravify`}
                  />
              </div>
           </motion.div>
        </div>
      )
    }
  ];

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
      setProgress(0);
    }
  }, [currentSlide, slides.length]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setProgress(0);
    }
  }, [currentSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (100 / (SLIDE_DURATION / 100));
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentSlide, nextSlide]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden font-sans select-none">
      {/* Background Images with Zoom Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentSlide].image}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 0.6 }}
          exit={{ scale: 1, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={slides[currentSlide].image} 
            alt="bg" 
            className="w-full h-full object-cover grayscale-[0.5] brightness-[0.3]" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </motion.div>
      </AnimatePresence>

      {/* Progress Bars (Instagram Style) */}
      <div className="absolute top-6 left-4 right-4 flex gap-1.5 z-50">
        {slides.map((_, i) => (
          <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ 
                width: i < currentSlide ? "100%" : i === currentSlide ? `${progress}%` : "0%" 
              }}
              transition={{ duration: 0.1, ease: "linear" }}
              className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            />
          </div>
        ))}
      </div>

      {/* Navigation Areas */}
      <div className="absolute inset-0 flex z-30">
        <div className="w-1/3 h-full cursor-w-resize" onClick={prevSlide} />
        <div className="w-2/3 h-full cursor-e-resize" onClick={nextSlide} />
      </div>

      {/* Content Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="z-40 w-full flex items-center justify-center"
        >
          {slides[currentSlide].content}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Brand Tag */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-50 pointer-events-none">
         <span className="text-white/30 font-black text-xs tracking-[0.5em] uppercase">Built with Stravify AI</span>
      </div>

      {/* Grain Effect Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-10" />
    </div>
  );
}
