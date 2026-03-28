import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LoginButton from "@/components/LoginButton";
import { getStravaData, calculateMetrics } from "@/lib/strava";
import LogoutButton from "@/components/LogoutButton";
import WrappedStory from "@/components/WrappedStory";
import { getDictionary, Language } from "@/lib/i18n";
import { headers } from "next/headers";

export default async function Home() {
  const session = await getServerSession(authOptions);
  
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
      const { athlete, activities } = await getStravaData(session.accessToken);
      metrics = calculateMetrics(athlete, activities);
    } catch (error: any) {
      errorMsg = dict.error;
    }

    if (errorMsg) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] text-white p-6">
           <div className="bg-red-950/50 border border-red-500 text-red-200 p-8 rounded-3xl max-w-md text-center backdrop-blur-md">
             {errorMsg}
             <div className="mt-6 text-center flex justify-center">
                <LogoutButton text={dict.logout} />
             </div>
           </div>
        </main>
      );
    }

    return (
      <WrappedStory 
        metrics={metrics} 
        dict={dict} 
        lang={lang} 
        name={metrics?.profile.name || "Athlete"} 
      />
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] text-white p-6 overflow-hidden relative font-sans text-center">
      <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_#2d1d11_0%,_#09090b_70%)] -z-10"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      <div className="z-10 flex flex-col items-center space-y-10 max-w-4xl">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 shadow-[0_0_80px_rgba(249,115,22,0.4)] animate-pulse"></div>
        
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter italic uppercase text-white leading-none">
          Stravify <br/> <span className="text-orange-500">Wrapped.</span>
        </h1>
        
        <p className="text-2xl md:text-3xl text-zinc-400 font-medium max-w-2xl leading-tight italic">
          {dict.landingTitle} <br/>
          <span className="text-xl text-zinc-500 mt-4 block">{dict.landingDesc}</span>
        </p>
        
        <div className="pt-8">
          <LoginButton text={dict.connect} />
        </div>
      </div>
    </main>
  );
}
