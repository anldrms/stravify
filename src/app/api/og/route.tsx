import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Parametreleri alıyoruz (eğer yoksa varsayılan değerler atıyoruz)
    const distance = searchParams.get('distance') || '0';
    const elevation = searchParams.get('elevation') || '0';
    const runs = searchParams.get('runs') || '0';
    const name = searchParams.get('name') || 'Bir Koşucu';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#09090b', // zinc-950
            backgroundImage: 'radial-gradient(circle at top, #ea580c 0%, #09090b 70%)',
            fontFamily: 'sans-serif',
            color: 'white',
            padding: '40px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '70px', fontWeight: '900', color: '#f97316', margin: 0, letterSpacing: '-2px' }}>
              Stravify.
            </h1>
            <p style={{ fontSize: '30px', color: '#a1a1aa', marginTop: '10px', fontWeight: '500' }}>
              {name}
            </p>
          </div>

          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'rgba(24, 24, 27, 0.8)', border: '2px solid #27272a', borderRadius: '30px', padding: '50px 30px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '80px', fontWeight: '900', color: 'white', lineHeight: '1' }}>{distance}</span>
              <span style={{ fontSize: '24px', color: '#f97316', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '10px' }}>Kilometre</span>
            </div>

            <div style={{ width: '2px', height: '100px', backgroundColor: '#27272a' }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '80px', fontWeight: '900', color: 'white', lineHeight: '1' }}>{elevation}m</span>
              <span style={{ fontSize: '24px', color: '#f97316', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '10px' }}>Tırmanış</span>
            </div>

            <div style={{ width: '2px', height: '100px', backgroundColor: '#27272a' }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '80px', fontWeight: '900', color: 'white', lineHeight: '1' }}>{runs}</span>
              <span style={{ fontSize: '24px', color: '#f97316', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '10px' }}>Aktivite</span>
            </div>

          </div>

          <div style={{ marginTop: '60px', display: 'flex', fontSize: '24px', color: '#71717a' }}>
            stravify.vercel.app adresinden kendi istatistiklerini oluştur!
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
