"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Mountain, Route, Award, Footprints, Clock, MapPin, Heart, Zap, Calendar } from "lucide-react";
import ShareButton from "./ShareButton";
import { Language } from "@/lib/i18n";

export default function WrappedStory({ metrics, dict, lang, name }: { metrics: any, dict: any, lang: Language, name: string }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Welcome
    {
      id: "welcome",
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 shadow-[0_0_50px_rgba(249,115,22,0.5)] mb-4" />
          <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase text-orange-500">
            {dict.yourWrapped}
          </motion.h2>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }} className="text-2xl text-zinc-400 font-medium italic">
            {dict.subtitle}
          </motion.p>
        </div>
      ),
      bg: "bg-[#09090b]"
    },
    // Slide 2: Distance & Time
    {
      id: "stats",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
          <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-zinc-900/60 p-10 rounded-3xl border border-orange-500/20 shadow-2xl backdrop-blur-xl">
             <Route className="w-12 h-12 text-orange-500 mb-6" />
             <div className="text-7xl font-black text-white">{metrics.totalDistanceKm}</div>
             <div className="text-xl text-zinc-500 font-bold uppercase tracking-widest mt-2">{dict.totalKm}</div>
          </motion.div>
          <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-zinc-900/60 p-10 rounded-3xl border border-rose-500/20 shadow-2xl backdrop-blur-xl">
             <Clock className="w-12 h-12 text-rose-500 mb-6" />
             <div className="text-7xl font-black text-white">{metrics.totalHours}</div>
             <div className="text-xl text-zinc-500 font-bold uppercase tracking-widest mt-2">{dict.time}</div>
          </motion.div>
        </div>
      ),
      bg: "bg-[radial-gradient(circle_at_top_left,_#1a1a1a_0%,_#09090b_50%)]"
    },
    // Slide 3: Behavior (Day & Time)
    {
      id: "behavior",
      content: (
        <div className="flex flex-col items-center space-y-12 w-full max-w-4xl">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-4">
             <Calendar className="w-16 h-16 text-orange-400 mx-auto mb-4" />
             <h3 className="text-5xl font-black">{dict.topDay}</h3>
             <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-600 italic">
               {metrics.topDay[lang]}
             </div>
          </motion.div>
          
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }} className="flex items-center gap-6 bg-zinc-900/40 p-6 rounded-full border border-zinc-800">
             <Zap className="w-8 h-8 text-yellow-400" />
             <span className="text-2xl font-bold">{dict.topTime}: <span className="text-yellow-400 uppercase">{dict[metrics.topTime]}</span></span>
          </motion.div>
        </div>
      ),
      bg: "bg-[radial-gradient(circle_at_bottom_right,_#2d1d11_0%,_#09090b_60%)]"
    },
    // Slide 4: Records (Max Speed & Longest)
    {
      id: "records",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-zinc-900/60 p-10 rounded-3xl border border-zinc-800 text-center">
             <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
             <div className="text-6xl font-black text-white">{metrics.maxSpeedKph} <span className="text-2xl text-zinc-500 italic">km/h</span></div>
             <div className="text-xl text-zinc-500 font-bold uppercase tracking-widest mt-2">{dict.maxSpeed}</div>
          </motion.div>
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }} className="bg-zinc-900/60 p-10 rounded-3xl border border-zinc-800 text-center">
             <Award className="w-12 h-12 text-orange-500 mx-auto mb-6" />
             <div className="text-6xl font-black text-white">{metrics.longestRunKm} <span className="text-2xl text-zinc-500 italic">km</span></div>
             <div className="text-xl text-zinc-500 font-bold uppercase tracking-widest mt-2">{dict.longest}</div>
          </motion.div>
        </div>
      ),
      bg: "bg-[#09090b]"
    },
    // Slide 5: Social & Kudos
    {
      id: "social",
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-8">
           <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-rose-500/20 p-10 rounded-full">
              <Heart className="w-24 h-24 text-rose-500 fill-rose-500" />
           </motion.div>
           <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-black uppercase tracking-widest text-zinc-500">{dict.socialStatus}</motion.h3>
           <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-9xl font-black text-white">{metrics.totalKudos}</motion.div>
           <p className="text-2xl text-zinc-400 font-bold italic">{dict.kudos}</p>
        </div>
      ),
      bg: "bg-[radial-gradient(circle_at_center,_#200d0d_0%,_#09090b_80%)]"
    },
    // Final Slide: Summary & Share
    {
      id: "final",
      content: (
        <div className="flex flex-col items-center justify-center text-center space-y-12 w-full max-w-2xl">
           <div className="space-y-2">
             <h2 className="text-6xl font-black italic uppercase text-orange-500 leading-tight">Your Story <br/> is Told.</h2>
             <p className="text-xl text-zinc-400">Now, go make some noise on X!</p>
           </div>
           
           <div className="bg-zinc-900/80 p-8 rounded-[40px] border border-zinc-800 w-full shadow-3xl">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                   <div className="text-4xl font-black">{metrics.totalDistanceKm}</div>
                   <div className="text-xs text-zinc-500 font-bold uppercase">KM</div>
                </div>
                <div>
                   <div className="text-4xl font-black">{metrics.topCity}</div>
                   <div className="text-xs text-zinc-500 font-bold uppercase">BASE</div>
                </div>
              </div>
              <ShareButton 
                  distance={metrics.totalDistanceKm} 
                  elevation={metrics.totalElevationMeters} 
                  runs={metrics.runCount}
                  time={metrics.totalHours}
                  city={metrics.topCity}
                  name={name}
                  lang={lang}
                  buttonText={dict.shareX}
                  shareText={`Wrapped by Stravify: ${metrics.totalDistanceKm} KM / ${metrics.totalHours} HOURS in 100 activities! 🔥`}
                />
           </div>
        </div>
      ),
      bg: "bg-[#09090b]"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${slides[currentSlide].bg} transition-colors duration-1000 overflow-hidden`}>
      {/* Background grain/noise effect */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

      {/* Progress Bar */}
      <div className="absolute top-6 left-6 right-6 flex gap-1 z-50">
        {slides.map((_, i) => (
          <div key={i} className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: i < currentSlide ? "100%" : i === currentSlide ? "100%" : "0%" }}
              transition={{ duration: i === currentSlide ? 5 : 0.3 }}
              onAnimationComplete={() => {
                 if (i === currentSlide && currentSlide < slides.length - 1) {
                    // nextSlide(); // Auto progress option
                 }
              }}
              className="h-full bg-white/80"
            />
          </div>
        ))}
      </div>

      {/* Navigation Areas (Invisible Click Areas) */}
      <div className="absolute inset-0 flex z-30">
        <div className="w-1/4 h-full cursor-w-resize" onClick={prevSlide}></div>
        <div className="w-3/4 h-full cursor-e-resize" onClick={nextSlide}></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="z-40 w-full flex items-center justify-center"
        >
          {slides[currentSlide].content}
        </motion.div>
      </AnimatePresence>

      {/* Manual Controls */}
      <div className="absolute bottom-10 flex gap-4 z-50">
        {currentSlide > 0 && (
          <button onClick={prevSlide} className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}
        {currentSlide < slides.length - 1 && (
          <button onClick={nextSlide} className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <ChevronRight className="w-8 h-8" />
          </button>
        )}
      </div>

      {/* Background Decor (Blurry blobs) */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
}
