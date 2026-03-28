export async function getStravaActivities(accessToken: string) {
  const res = await fetch(
    "https://www.strava.com/api/v3/athlete/activities?per_page=100",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Strava'dan veri çekilemedi.");
  }

  const activities = await res.json();
  return activities;
}

const CITY_COMPARISONS: Record<string, { city: string, dist: number }> = {
  "Istanbul": { city: "Ankara", dist: 350 },
  "London": { city: "Paris", dist: 340 },
  "New York": { city: "Washington D.C.", dist: 330 },
  "Paris": { city: "Amsterdam", dist: 430 },
  "Berlin": { city: "Prague", dist: 280 },
  "Tokyo": { city: "Osaka", dist: 400 },
  "San Francisco": { city: "Los Angeles", dist: 600 },
  "Toronto": { city: "Montreal", dist: 540 },
};

export function calculateMetrics(activities: any[]) {
  let totalDistanceMeters = 0;
  let totalElevationMeters = 0;
  let totalMovingTimeSeconds = 0;
  let totalKudos = 0;
  let longestRunMeters = 0;
  let maxSpeed = 0; // m/s
  
  const cities: Record<string, number> = {};
  const dayOfWeek: Record<string, number> = { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0 };
  const timeOfDay: { morning: number, afternoon: number, evening: number, night: number } = { morning: 0, afternoon: 0, evening: 0, night: 0 };

  activities.forEach((activity: any) => {
    totalDistanceMeters += activity.distance;
    totalElevationMeters += activity.total_elevation_gain;
    totalMovingTimeSeconds += activity.moving_time;
    totalKudos += (activity.kudos_count || 0);

    if (activity.distance > longestRunMeters) longestRunMeters = activity.distance;
    if (activity.max_speed > maxSpeed) maxSpeed = activity.max_speed;

    // Gün Analizi
    const date = new Date(activity.start_date_local);
    dayOfWeek[date.getDay().toString()] += 1;

    // Saat Analizi
    const hour = date.getHours();
    if (hour >= 5 && hour < 12) timeOfDay.morning += 1;
    else if (hour >= 12 && hour < 17) timeOfDay.afternoon += 1;
    else if (hour >= 17 && hour < 21) timeOfDay.evening += 1;
    else timeOfDay.night += 1;

    // Şehir tespiti - Daha güvenilir bir yöntem
    let city = activity.location_city;
    if (!city && activity.timezone) {
       // "Europe/Istanbul" -> "Istanbul" (Atikokan gibi garip yerleri filtrele)
       const parts = activity.timezone.split('/');
       const tzCity = parts.pop()?.replace('_', ' ');
       if (tzCity && !["Atikokan", "UTC"].includes(tzCity)) {
         city = tzCity;
       }
    }
    if (city) cities[city] = (cities[city] || 0) + 1;
  });

  // En çok bulunulan şehri bul (Boş değilse)
  let topCity = Object.entries(cities).sort((a,b) => b[1] - a[1])[0]?.[0] || "Earth";
  
  // Favori Gün
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const daysTr = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  const topDayIndex = Object.entries(dayOfWeek).sort((a,b) => b[1] - a[1])[0]?.[0] || "0";
  
  // Favori Zaman
  const topTime = Object.entries(timeOfDay).sort((a,b) => b[1] - a[1])[0]?.[0] || "morning";

  const totalDistanceKm = (totalDistanceMeters / 1000).toFixed(1);
  const totalHours = (totalMovingTimeSeconds / 3600).toFixed(1);
  const avgPace = (totalMovingTimeSeconds / (totalDistanceMeters / 1000) / 60).toFixed(2); // min/km (yaklaşık)
  
  // Dinamik karşılaştırma
  let comparison = CITY_COMPARISONS[topCity] || CITY_COMPARISONS["London"];
  const travelCount = (parseFloat(totalDistanceKm) / comparison.dist).toFixed(1);

  return {
    runCount: activities.length,
    totalDistanceKm,
    totalElevationMeters: Math.round(totalElevationMeters),
    longestRunKm: (longestRunMeters / 1000).toFixed(1),
    totalHours,
    totalKudos,
    topCity,
    topDay: { en: days[parseInt(topDayIndex)], tr: daysTr[parseInt(topDayIndex)] },
    topTime,
    maxSpeedKph: (maxSpeed * 3.6).toFixed(1), // km/h
    funFacts: {
      comparisonCity: comparison.city,
      travelCount: travelCount,
      eiffel: (totalElevationMeters / 330).toFixed(1),
      everest: (totalElevationMeters / 8848).toFixed(2),
    }
  };
}
