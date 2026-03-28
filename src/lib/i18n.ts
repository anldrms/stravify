export const dictionaries = {
  en: {
    welcome: "Welcome",
    yourPacePrint: "Your PacePrint",
    subtitle: "The legendary breakdown of your last 100 activities.",
    totalKm: "Total KM",
    elevation: "Elevation",
    activities: "Activities",
    longest: "Longest (KM)",
    time: "Time (Hours)",
    topCity: "Top City",
    funFacts: "Mind-Blowing Facts 🤯",
    invisibleTravel: "Invisible Travel",
    invisibleTravelDesc: (city: string, times: string) => `With the distance you've covered, you could have traveled from your base to ${city} exactly ${times} times! 🚗`,
    climbMonster: "Climbing Monster",
    climbMonsterDesc: (eiffel: string, everest: string) => `You've climbed the equivalent of the Eiffel Tower ${eiffel} times, and Mount Everest ${everest} times! 🧗`,
    shareX: "Share on X",
    error: "Error fetching data. Please reconnect Strava.",
    connect: "Connect with Strava",
    landingTitle: "Turn your Strava data into art.",
    landingDesc: "Discover your yearly runs, cities visited, and share cool stats on social media!",
    logout: "Log out",
    generating: "Generating your card...",
    unknownCity: "Earth",
  },
  tr: {
    welcome: "Merhaba",
    yourPacePrint: "Senin PacePrint'in",
    subtitle: "Son 100 aktivitenin efsanevi dökümü.",
    totalKm: "Toplam KM",
    elevation: "Tırmanış",
    activities: "Aktivite",
    longest: "En Uzun (KM)",
    time: "Süre (Saat)",
    topCity: "Favori Şehir",
    funFacts: "Eğlenceli İstatistikler 🤯",
    invisibleTravel: "Görünmez Seyahat",
    invisibleTravelDesc: (city: string, times: string) => `Koştuğun/yürüdüğün mesafeyle bulunduğun yerden ${city} şehrine tam ${times} kez gidebilirdin! 🚗`,
    climbMonster: "Tırmanış Canavarı",
    climbMonsterDesc: (eiffel: string, everest: string) => `Tırmandığın toplam yükseklikle Eyfel Kulesi'ne ${eiffel} kez, Everest'in zirvesine ise ${everest} kez tırmanmış kadar oldun! 🧗`,
    shareX: "X'te Paylaş",
    error: "Veriler çekilirken bir hata oluştu. Strava bağlantınızı yenileyin.",
    connect: "Strava ile Bağlan",
    landingTitle: "Strava verilerini sanata dönüştür.",
    landingDesc: "Yıllık koşunu, gezdiğin şehirleri keşfet ve sosyal medyada havalı istatistiklerini paylaş!",
    logout: "Çıkış Yap",
    generating: "Kartın oluşturuluyor...",
    unknownCity: "Dünya",
  }
};

export type Language = 'en' | 'tr';

export function getDictionary(lang: Language) {
  return dictionaries[lang];
}
