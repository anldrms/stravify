export async function getStravaActivities(accessToken: string) {
  // Strava API'den son 100 aktiviteyi çekiyoruz
  const res = await fetch(
    "https://www.strava.com/api/v3/athlete/activities?per_page=100",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 3600 }, // 1 saat önbellekte tut (Vercel/Next.js optimizasyonu)
    }
  );

  if (!res.ok) {
    throw new Error("Strava'dan veri çekilemedi. Token süresi dolmuş olabilir.");
  }

  const activities = await res.json();
  return activities;
}

export function calculateMetrics(activities: any[]) {
  let totalDistanceMeters = 0;
  let totalElevationMeters = 0;
  let runCount = 0;
  let longestRunMeters = 0;

  // Sadece koşu, yürüyüş veya bisiklet. Şu an genel olarak topluyoruz, 
  // istersen sadece "Run" olarak filtreleyebiliriz:
  // activities = activities.filter(a => a.type === "Run");

  activities.forEach((activity: any) => {
    totalDistanceMeters += activity.distance;
    totalElevationMeters += activity.total_elevation_gain;
    runCount += 1;

    if (activity.distance > longestRunMeters) {
      longestRunMeters = activity.distance;
    }
  });

  const totalDistanceKm = (totalDistanceMeters / 1000).toFixed(1);
  const totalElevationMetersRounded = Math.round(totalElevationMeters);
  
  // Eğlenceli metrik hesaplamaları
  // İstanbul - Ankara arası kuş uçuşu yaklaşık 350 km
  const istanbulToAnkaraCount = (parseFloat(totalDistanceKm) / 350).toFixed(1);
  
  // Eyfel Kulesi 330 metre, Everest 8848 metre
  const eiffelClimbs = (totalElevationMeters / 330).toFixed(1);
  const everestClimbs = (totalElevationMeters / 8848).toFixed(2);

  return {
    runCount,
    totalDistanceKm,
    totalElevationMeters: totalElevationMetersRounded,
    longestRunKm: (longestRunMeters / 1000).toFixed(1),
    funFacts: {
      istanbulAnkara: istanbulToAnkaraCount,
      eiffel: eiffelClimbs,
      everest: everestClimbs,
    }
  };
}
