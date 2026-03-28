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
    throw new Error("Strava'dan veri çekilemedi. Token süresi dolmuş olabilir.");
  }

  const activities = await res.json();
  return activities;
}

// Global mesafe karşılaştırmaları
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
  let runCount = 0;
  let longestRunMeters = 0;
  
  const cities: Record<string, number> = {};

  activities.forEach((activity: any) => {
    totalDistanceMeters += activity.distance;
    totalElevationMeters += activity.total_elevation_gain;
    totalMovingTimeSeconds += activity.moving_time;
    runCount += 1;

    if (activity.distance > longestRunMeters) {
      longestRunMeters = activity.distance;
    }

    if (activity.location_city) {
      cities[activity.location_city] = (cities[activity.location_city] || 0) + 1;
    } else if (activity.timezone) {
      const tzCity = activity.timezone.split('/').pop()?.replace('_', ' ');
      if (tzCity) {
        cities[tzCity] = (cities[tzCity] || 0) + 1;
      }
    }
  });

  let topCity = "";
  let maxCount = 0;
  for (const [city, count] of Object.entries(cities)) {
    if (count > maxCount) {
      maxCount = count;
      topCity = city;
    }
  }

  const totalDistanceKm = (totalDistanceMeters / 1000).toFixed(1);
  const totalElevationMetersRounded = Math.round(totalElevationMeters);
  const totalHours = (totalMovingTimeSeconds / 3600).toFixed(1);
  
  // Dinamik mesafe karşılaştırması
  let comparison = { city: "the Moon (0.1%)", dist: 384.4 }; // Default
  
  // En çok bulunulan şehre göre en yakın büyük rotayı bul
  if (topCity && CITY_COMPARISONS[topCity]) {
    comparison = CITY_COMPARISONS[topCity];
  } else {
    // Eğer tam eşleşme yoksa, genel bir tanesini seç (ya da ilkini)
    comparison = CITY_COMPARISONS["London"]; 
  }

  const travelCount = (parseFloat(totalDistanceKm) / comparison.dist).toFixed(1);
  const eiffelClimbs = (totalElevationMeters / 330).toFixed(1);
  const everestClimbs = (totalElevationMeters / 8848).toFixed(2);

  return {
    runCount,
    totalDistanceKm,
    totalElevationMeters: totalElevationMetersRounded,
    longestRunKm: (longestRunMeters / 1000).toFixed(1),
    totalHours,
    topCity: topCity || null,
    funFacts: {
      comparisonCity: comparison.city,
      travelCount: travelCount,
      eiffel: eiffelClimbs,
      everest: everestClimbs,
    }
  };
}
