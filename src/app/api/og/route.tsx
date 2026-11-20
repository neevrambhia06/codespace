import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';



export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Dynamic params
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'CodeSpace Workspace';
    const description = searchParams.get('description') ?? 'Your all-in-one developer workspace.';

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
            backgroundColor: '#09090b',
            fontFamily: 'sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              backgroundColor: '#18181b',
              padding: '60px 80px',
              borderRadius: '32px',
              border: '2px solid #27272a',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              width: '85%',
              maxWidth: '1050px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '36px',
                  fontWeight: 'bold',
                  marginRight: '24px',
                }}
              >
                CS
              </div>
              <span style={{ fontSize: '56px', fontWeight: 800, color: 'white', letterSpacing: '-0.05em' }}>
                CodeSpace
              </span>
            </div>
            
            <div
              style={{
                fontSize: '72px',
                fontWeight: 900,
                color: 'white',
                lineHeight: 1.1,
                marginBottom: '24px',
                letterSpacing: '-0.05em',
              }}
            >
              {title}
            </div>
            
            <div style={{ fontSize: '36px', color: '#a1a1aa', lineHeight: 1.4, maxWidth: '850px' }}>
              {description}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
