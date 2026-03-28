import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const distance = searchParams.get('distance') || '0';
    const elevation = searchParams.get('elevation') || '0';
    const runs = searchParams.get('runs') || '0';
    const time = searchParams.get('time') || '0';
    const city = searchParams.get('city') || 'Earth';
    const name = searchParams.get('name') || 'A Runner';
    const lang = searchParams.get('lang') || 'en';

    const t = {
      en: { totalKm: 'TOTAL KM', climb: 'ELEVATION', hours: 'HOURS', city: 'TOP CITY' },
      tr: { totalKm: 'TOPLAM KM', climb: 'TIRMANIŞ', hours: 'SAAT', city: 'FAVORİ ŞEHİR' }
    }[lang as 'en' | 'tr'] || { totalKm: 'TOTAL KM', climb: 'ELEVATION', hours: 'HOURS', city: 'TOP CITY' };

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#09090b',
            backgroundImage: 'radial-gradient(ellipse at right top, rgba(234, 88, 12, 0.4) 0%, #09090b 70%)',
            fontFamily: 'sans-serif',
            color: 'white',
            padding: '60px',
            overflow: 'hidden',
          }}
        >
          {/* Sol Kısım - Kişisel Bilgiler */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1 style={{ fontSize: '90px', fontWeight: '900', color: 'transparent', backgroundImage: 'linear-gradient(to right, #fb923c, #f43f5e)', backgroundClip: 'text', margin: 0, letterSpacing: '-3px', lineHeight: '1' }}>
                PacePrint.
              </h1>
              <p style={{ fontSize: '36px', color: '#e4e4e7', marginTop: '10px', fontWeight: '600' }}>
                {name}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
               <div style={{ display: 'flex', flexDirection: 'column' }}>
                 <span style={{ fontSize: '24px', color: '#f97316', fontWeight: 'bold', letterSpacing: '3px' }}>{t.city}</span>
                 <span style={{ fontSize: '48px', fontWeight: '800', color: 'white', lineHeight: '1.2' }}>{city}</span>
               </div>
            </div>

            <div style={{ display: 'flex', fontSize: '24px', color: '#71717a', fontWeight: 'bold' }}>
              stravify-rho.vercel.app
            </div>
          </div>

          {/* Sağ Kısım - İstatistik Kartları */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '20px', justifyContent: 'center' }}>
            
            <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'rgba(24, 24, 27, 0.6)', border: '2px solid rgba(234, 88, 12, 0.3)', borderRadius: '24px', padding: '30px' }}>
                <span style={{ fontSize: '64px', fontWeight: '900', color: 'white', lineHeight: '1' }}>{distance}</span>
                <span style={{ fontSize: '20px', color: '#fb923c', fontWeight: 'bold', marginTop: '10px' }}>{t.totalKm}</span>
              </div>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'rgba(24, 24, 27, 0.6)', border: '2px solid rgba(63, 63, 70, 0.5)', borderRadius: '24px', padding: '30px' }}>
                <span style={{ fontSize: '64px', fontWeight: '900', color: 'white', lineHeight: '1' }}>{elevation}m</span>
                <span style={{ fontSize: '20px', color: '#a1a1aa', fontWeight: 'bold', marginTop: '10px' }}>{t.climb}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'rgba(24, 24, 27, 0.6)', border: '2px solid rgba(63, 63, 70, 0.5)', borderRadius: '24px', padding: '30px' }}>
                <span style={{ fontSize: '64px', fontWeight: '900', color: 'white', lineHeight: '1' }}>{time}</span>
                <span style={{ fontSize: '20px', color: '#a1a1aa', fontWeight: 'bold', marginTop: '10px' }}>{t.hours}</span>
              </div>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'rgba(24, 24, 27, 0.6)', border: '2px solid rgba(63, 63, 70, 0.5)', borderRadius: '24px', padding: '30px' }}>
                <span style={{ fontSize: '64px', fontWeight: '900', color: 'white', lineHeight: '1' }}>{runs}</span>
                <span style={{ fontSize: '20px', color: '#a1a1aa', fontWeight: 'bold', marginTop: '10px' }}>AKTİVİTE / RUNS</span>
              </div>
            </div>

          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
