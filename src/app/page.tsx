import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LoginButton from "@/components/LoginButton";
import { getStravaActivities, calculateMetrics } from "@/lib/strava";
import { Mountain, Route, Award, Footprints, Clock, MapPin } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import ShareButton from "@/components/ShareButton";
import { getDictionary, Language } from "@/lib/i18n";
import { headers } from "next/headers";

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  // Dil tespiti (Kullanıcının tarayıcısından gelen Accept-Language veya Vercel Edge'den)
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const isTr = acceptLanguage.toLowerCase().includes("tr");
  const lang: Language = isTr ? "tr" : "en";
  const dict = getDictionary(lang);

  if (session && session.accessToken) {
    let metrics = null;
    let errorMsg = null;
    
    try {
      // @ts-ignore
      const activities = await getStravaActivities(session.accessToken);
      metrics = calculateMetrics(activities);
    } catch (error: any) {
      errorMsg = dict.error;
    }

    return (
      <main className="flex min-h-screen flex-col items-center bg-[#09090b] text-white p-6 md:p-12 relative overflow-hidden font-sans">
        {/* Arka Plan Işıkları (Neon efekti) */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-orange-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <header className="w-full max-w-6xl flex justify-between items-center mb-12 z-10 p-4 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl shadow-2xl">
          <div className="flex items-center gap-3 pl-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 animate-pulse"></div>
            <h1 className="text-2xl font-black tracking-tighter text-white">
              Stravify.
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400 text-sm hidden md:inline-block">
              {dict.welcome}, <strong className="text-white bg-white/10 px-3 py-1 rounded-full">{session.user?.name}</strong>
            </span>
            <LogoutButton text={dict.logout} />
          </div>
        </header>

        {errorMsg ? (
          <div className="bg-red-950/50 border border-red-500 text-red-200 p-6 rounded-2xl max-w-md text-center backdrop-blur-md">
            {errorMsg}
          </div>
        ) : (
          <div className="w-full max-w-6xl space-y-12 z-10 flex flex-col items-center">
            
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-500 to-orange-500 animate-gradient-x">
                  {dict.yourPacePrint}
                </span>
              </h2>
              <p className="text-zinc-400 text-xl font-medium">{dict.subtitle}</p>
            </div>

            {/* Büyük Ana İstatistik (Yeni) */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 p-8 rounded-3xl flex flex-col items-center justify-center text-center hover:border-orange-500/50 transition-all hover:-translate-y-1 shadow-xl">
                  <MapPin className="w-12 h-12 text-orange-400 mb-4" />
                  <span className="text-5xl font-black text-white">{metrics?.topCity || dict.unknownCity}</span>
                  <span className="text-zinc-500 font-bold uppercase tracking-widest text-sm mt-2">{dict.topCity}</span>
               </div>
               
               <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 p-8 rounded-3xl flex flex-col items-center justify-center text-center hover:border-rose-500/50 transition-all hover:-translate-y-1 shadow-xl">
                  <Clock className="w-12 h-12 text-rose-400 mb-4" />
                  <span className="text-5xl font-black text-white">{metrics?.totalHours}</span>
                  <span className="text-zinc-500 font-bold uppercase tracking-widest text-sm mt-2">{dict.time}</span>
               </div>
            </div>

            {/* 4'lü Küçük İstatistik Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              <div className="bg-zinc-900/30 backdrop-blur-md border border-zinc-800/50 p-6 rounded-3xl flex flex-col items-center text-center hover:bg-zinc-800/50 transition-colors">
                <Route className="w-6 h-6 text-zinc-400 mb-3" />
                <span className="text-4xl font-black text-orange-100">{metrics?.totalDistanceKm}</span>
                <span className="text-zinc-500 font-semibold uppercase tracking-wider text-xs mt-1">{dict.totalKm}</span>
              </div>
              <div className="bg-zinc-900/30 backdrop-blur-md border border-zinc-800/50 p-6 rounded-3xl flex flex-col items-center text-center hover:bg-zinc-800/50 transition-colors">
                <Mountain className="w-6 h-6 text-zinc-400 mb-3" />
                <span className="text-4xl font-black text-orange-100">{metrics?.totalElevationMeters}m</span>
                <span className="text-zinc-500 font-semibold uppercase tracking-wider text-xs mt-1">{dict.elevation}</span>
              </div>
              <div className="bg-zinc-900/30 backdrop-blur-md border border-zinc-800/50 p-6 rounded-3xl flex flex-col items-center text-center hover:bg-zinc-800/50 transition-colors">
                <Footprints className="w-6 h-6 text-zinc-400 mb-3" />
                <span className="text-4xl font-black text-orange-100">{metrics?.runCount}</span>
                <span className="text-zinc-500 font-semibold uppercase tracking-wider text-xs mt-1">{dict.activities}</span>
              </div>
              <div className="bg-zinc-900/30 backdrop-blur-md border border-zinc-800/50 p-6 rounded-3xl flex flex-col items-center text-center hover:bg-zinc-800/50 transition-colors">
                <Award className="w-6 h-6 text-zinc-400 mb-3" />
                <span className="text-4xl font-black text-orange-100">{metrics?.longestRunKm}</span>
                <span className="text-zinc-500 font-semibold uppercase tracking-wider text-xs mt-1">{dict.longest}</span>
              </div>
            </div>

            {/* Eğlenceli İstatistik Kartları */}
            <div className="w-full pt-8">
              <h3 className="text-3xl font-black mb-8 text-center text-white/90">{dict.funFacts}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 p-8 rounded-3xl relative overflow-hidden group hover:border-orange-500/30 transition-all">
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl group-hover:bg-orange-500/40 transition-all"></div>
                  <h4 className="text-2xl font-black mb-4 text-orange-100">{dict.invisibleTravel}</h4>
                  <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                    {dict.invisibleTravelDesc(
                      metrics?.funFacts.comparisonCity || "Mars",
                      metrics?.funFacts.travelCount || "0"
                    )}
                  </p>
                </div>

                <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/60 p-8 rounded-3xl relative overflow-hidden group hover:border-rose-500/30 transition-all">
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl group-hover:bg-rose-500/40 transition-all"></div>
                  <h4 className="text-2xl font-black mb-4 text-rose-100">{dict.climbMonster}</h4>
                  <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                    {dict.climbMonsterDesc(
                      metrics?.funFacts.eiffel || "0", 
                      metrics?.funFacts.everest || "0"
                    )}
                  </p>
                </div>

              </div>
            </div>

            {/* Share Button */}
            {metrics && (
              <div className="pt-8 pb-16">
                <ShareButton 
                  distance={metrics.totalDistanceKm} 
                  elevation={metrics.totalElevationMeters} 
                  runs={metrics.runCount}
                  time={metrics.totalHours}
                  city={metrics.topCity || dict.unknownCity}
                  name={session.user?.name || "Bir Koşucu"}
                  lang={lang}
                  buttonText={dict.shareX}
                  shareText={`${dict.yourPacePrint}: ${metrics.totalDistanceKm} ${dict.totalKm} / ${metrics.totalElevationMeters}m ${dict.elevation} 🔥`}
                />
              </div>
            )}
            
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] text-white p-6 overflow-hidden relative font-sans">
      <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-600/15 via-[#09090b] to-[#09090b] -z-10"></div>
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>

      <div className="text-center space-y-8 max-w-4xl z-10 flex flex-col items-center">
        <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 animate-pulse shadow-[0_0_60px_rgba(249,115,22,0.5)]"></div>
        
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-orange-100 to-zinc-500 py-2">
          Stravify.
        </h1>
        
        <p className="text-2xl md:text-3xl text-zinc-400 font-medium max-w-2xl mx-auto leading-tight">
          {dict.landingTitle} <br/>
          <span className="text-xl md:text-2xl text-zinc-500 mt-4 block">{dict.landingDesc}</span>
        </p>
        
        <div className="pt-12">
          <LoginButton text={dict.connect} />
        </div>
      </div>
    </main>
  );
}
