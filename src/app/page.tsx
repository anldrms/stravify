import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LoginButton from "@/components/LoginButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Hoş Geldin, {session.user?.name}!</h1>
        <p className="text-zinc-400 mb-8 text-center">Strava verilerinle harikalar yaratmaya hazır mısın?</p>
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl w-full max-w-lg shadow-2xl">
           <h2 className="text-xl font-semibold mb-4 text-orange-400">Yakında Gelecek Metrikler:</h2>
           <ul className="space-y-3 text-zinc-300">
             <li className="flex items-center gap-2">🌍 <span><strong className="text-white">Şehir İstilacısı:</strong> En çok hangi şehirde koştun?</span></li>
             <li className="flex items-center gap-2">🏔️ <span><strong className="text-white">Everest Macerası:</strong> Toplamda ne kadar tırmandın?</span></li>
             <li className="flex items-center gap-2">🚀 <span><strong className="text-white">Aylık Rapor:</strong> İstanbul'dan nereye koşarak gittin?</span></li>
           </ul>
        </div>
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
