import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LoginButton from "@/components/LoginButton";
import { getStravaActivities, calculateMetrics } from "@/lib/strava";
import { ArrowRight, Mountain, Route, Award, Footprints } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session && session.accessToken) {
    let metrics = null;
    let errorMsg = null;
    
    try {
      // @ts-ignore
      const activities = await getStravaActivities(session.accessToken);
      metrics = calculateMetrics(activities);
    } catch (error: any) {
      errorMsg = "Veriler çekilirken bir hata oluştu. Strava bağlantınızı yenileyin.";
    }

    return (
      <main className="flex min-h-screen flex-col items-center bg-zinc-950 text-white p-8 md:p-16 relative">
        <div className="absolute top-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/10 via-zinc-950 to-zinc-950 -z-10"></div>
        
        <header className="w-full max-w-5xl flex justify-between items-center mb-16 z-10">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-500">
            Stravify.
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400 text-sm">Merhaba, <strong className="text-white">{session.user?.name}</strong></span>
            <LogoutButton />
          </div>
        </header>

        {errorMsg ? (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-6 rounded-xl max-w-md text-center">
            {errorMsg}
          </div>
        ) : (
          <div className="w-full max-w-5xl space-y-12 z-10">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Senin <span className="text-orange-500">PacePrint'in</span></h2>
              <p className="text-zinc-400 text-lg">Son 100 aktivitenin efsanevi dökümü.</p>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 hover:border-orange-500/50 transition-colors">
                <Route className="w-8 h-8 text-orange-400 mb-2" />
                <span className="text-4xl font-black">{metrics?.totalDistanceKm}</span>
                <span className="text-zinc-500 font-medium uppercase tracking-wider text-sm">Toplam KM</span>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 hover:border-orange-500/50 transition-colors">
                <Mountain className="w-8 h-8 text-orange-400 mb-2" />
                <span className="text-4xl font-black">{metrics?.totalElevationMeters}m</span>
                <span className="text-zinc-500 font-medium uppercase tracking-wider text-sm">Tırmanış</span>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 hover:border-orange-500/50 transition-colors">
                <Footprints className="w-8 h-8 text-orange-400 mb-2" />
                <span className="text-4xl font-black">{metrics?.runCount}</span>
                <span className="text-zinc-500 font-medium uppercase tracking-wider text-sm">Aktivite</span>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 hover:border-orange-500/50 transition-colors">
                <Award className="w-8 h-8 text-orange-400 mb-2" />
                <span className="text-4xl font-black">{metrics?.longestRunKm}</span>
                <span className="text-zinc-500 font-medium uppercase tracking-wider text-sm">En Uzun (KM)</span>
              </div>
            </div>

            {/* Fun Facts Cards */}
            <h3 className="text-2xl font-bold mt-12 mb-6 border-b border-zinc-800 pb-4">Eğlenceli İstatistikler 🤯</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all"></div>
                <h4 className="text-xl font-bold mb-3 text-orange-100">Görünmez Seyahat</h4>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Şu ana kadar koştuğun/yürüdüğün mesafeyle İstanbul'dan Ankara'ya tam <strong className="text-orange-400 text-2xl">{metrics?.funFacts.istanbulAnkara}</strong> kez gidebilirdin! 🚗
                </p>
              </div>

              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-all"></div>
                <h4 className="text-xl font-bold mb-3 text-rose-100">Tırmanış Canavarı</h4>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  Tırmandığın toplam yükseklikle Eyfel Kulesi'ne <strong className="text-rose-400 text-2xl">{metrics?.funFacts.eiffel}</strong> kez, Everest'in zirvesine ise <strong className="text-rose-400 text-2xl">{metrics?.funFacts.everest}</strong> kez tırmanmış kadar oldun! 🧗
                </p>
              </div>

            </div>
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white p-4 overflow-hidden relative">
      <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/10 via-zinc-950 to-zinc-950 -z-10"></div>
      
      <div className="text-center space-y-6 max-w-3xl z-10">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-orange-400 via-orange-500 to-rose-600 py-2">
          Stravify.
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl mx-auto leading-relaxed">
          Strava verilerini sanata ve havalı istatistiklere dönüştür. Yıllık koşunu, gezdiğin şehirleri keşfet ve sosyal medyada paylaş!
        </p>
        
        <div className="pt-10">
          <LoginButton />
        </div>
      </div>
    </main>
  );
}
